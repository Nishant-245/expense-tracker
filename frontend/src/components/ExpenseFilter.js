import React from "react";
import { Paper, Grid, TextField, MenuItem } from "@mui/material";

const categories = ["", "Food", "Transport", "Entertainment", "Bills", "Other"];

function ExpenseFilter({ onFilterChange }) {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Category"
            onChange={(e) =>
              onFilterChange((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category || "All Categories"}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Date"
            InputLabelProps={{ shrink: true }}
            onChange={(e) =>
              onFilterChange((prev) => ({ ...prev, date: e.target.value }))
            }
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ExpenseFilter;
