import React, { useState, useEffect } from "react";
import { Paper, Typography, TextField, Grid } from "@mui/material";

function ExpenseTotal() {
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      fetchTotal();
    }
  }, [dateRange]);

  const fetchTotal = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/expenses/total?start=${dateRange.start}&end=${dateRange.end}`
      );
      const data = await response.json();
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching total:", error);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="date"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            value={dateRange.start}
            onChange={(e) =>
              setDateRange({ ...dateRange, start: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="date"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            value={dateRange.end}
            onChange={(e) =>
              setDateRange({ ...dateRange, end: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" align="center">
            Total: ${total}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ExpenseTotal;
