const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// Add new expense
router.post("/", async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all expenses with optional filters
router.get("/", async (req, res) => {
  try {
    const { category, date } = req.query;
    let query = {};

    if (category) query.category = category;
    if (date)
      query.date = { $gte: new Date(date), $lt: new Date(date + "T23:59:59") };

    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get total expenses for date range
router.get("/total", async (req, res) => {
  try {
    const { start, end } = req.query;
    const result = await Expense.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(start),
            $lte: new Date(end),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);
    res.json({ total: result[0]?.total || 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
