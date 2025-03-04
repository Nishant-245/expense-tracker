import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";

const categories = ["Food", "Transport", "Entertainment", "Bills", "Other"];

function ExpenseForm({ onExpenseAdded }) {
  const [expense, setExpense] = useState({
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });

      if (!response.ok) {
        throw new Error("Failed to add expense");
      }

      setExpense({
        amount: "",
        category: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });

      setSnackbarMessage("Expense added successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      onExpenseAdded();
    } catch (error) {
      console.error("Error adding expense:", error);
      setSnackbarMessage("Failed to add expense. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Paper sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Add New Expense
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill in the details below to add a new expense
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={expense.amount}
                onChange={(e) =>
                  setExpense({ ...expense, amount: e.target.value })
                }
                required
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Category"
                value={expense.category}
                onChange={(e) =>
                  setExpense({ ...expense, category: e.target.value })
                }
                required
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={expense.description}
                onChange={(e) =>
                  setExpense({ ...expense, description: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                value={expense.date}
                onChange={(e) =>
                  setExpense({ ...expense, date: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                size="large"
                startIcon={<AddCircle />}
                sx={{ mt: 2 }}
              >
                Add Expense
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ExpenseForm;
