import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import {
  CalendarMonth,
  TrendingUp,
  AccountBalance,
  ShowChart,
} from "@mui/icons-material";

const periods = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

function ExpenseSummary({ expenses = [] }) {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const calculateTotal = () => {
    const currentDate = new Date(startDate);
    let filteredExpenses = [];

    switch (selectedPeriod) {
      case "daily":
        filteredExpenses = expenses.filter(
          (expense) =>
            new Date(expense.date).toDateString() === currentDate.toDateString()
        );
        break;
      case "weekly":
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        filteredExpenses = expenses.filter(
          (expense) =>
            new Date(expense.date) >= weekStart &&
            new Date(expense.date) <= weekEnd
        );
        break;
      case "monthly":
        filteredExpenses = expenses.filter(
          (expense) =>
            new Date(expense.date).getMonth() === currentDate.getMonth() &&
            new Date(expense.date).getFullYear() === currentDate.getFullYear()
        );
        break;
      case "yearly":
        filteredExpenses = expenses.filter(
          (expense) =>
            new Date(expense.date).getFullYear() === currentDate.getFullYear()
        );
        break;
      default:
        filteredExpenses = expenses;
    }

    return {
      total: filteredExpenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
      ),
      count: filteredExpenses.length,
      average:
        filteredExpenses.length > 0
          ? filteredExpenses.reduce(
              (sum, expense) => sum + Number(expense.amount),
              0
            ) / filteredExpenses.length
          : 0,
      highest:
        filteredExpenses.length > 0
          ? Math.max(...filteredExpenses.map((e) => Number(e.amount)))
          : 0,
    };
  };

  const stats = calculateTotal();

  const summaryCards = [
    {
      title: "Total Expenses",
      value: `$${stats.total.toFixed(2)}`,
      icon: <AccountBalance sx={{ fontSize: 40, color: "primary.main" }} />,
      color: "primary.main",
    },
    {
      title: "Number of Expenses",
      value: stats.count,
      icon: <ShowChart sx={{ fontSize: 40, color: "success.main" }} />,
      color: "success.main",
    },
    {
      title: "Average Expense",
      value: `$${stats.average.toFixed(2)}`,
      icon: <TrendingUp sx={{ fontSize: 40, color: "info.main" }} />,
      color: "info.main",
    },
    {
      title: "Highest Expense",
      value: `$${stats.highest.toFixed(2)}`,
      icon: <CalendarMonth sx={{ fontSize: 40, color: "warning.main" }} />,
      color: "warning.main",
    },
  ];

  return (
    <Box>
      <Paper
        sx={{
          p: 3,
          mb: 3,
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Select Period"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              {periods.map((period) => (
                <MenuItem key={period.value} value={period.value}>
                  {period.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Select Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {summaryCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  {card.icon}
                  <Typography
                    variant="h6"
                    sx={{ ml: 1, color: "text.secondary" }}
                  >
                    {card.title}
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ color: card.color }}>
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ExpenseSummary;
