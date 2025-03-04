import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function ExpenseDashboard({ expenses = [] }) {
  const safeExpenses = Array.isArray(expenses) ? expenses : [];

  // Helper function to sort months
  const sortMonths = (a, b) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months.indexOf(a) - months.indexOf(b);
  };

  const categoryTotals = safeExpenses.reduce((acc, expense) => {
    const amount = Number(expense.amount) || 0;
    acc[expense.category] = (acc[expense.category] || 0) + amount;
    return acc;
  }, {});

  const monthlyTotals = safeExpenses.reduce((acc, expense) => {
    const amount = Number(expense.amount) || 0;
    const month = new Date(expense.date).toLocaleString("default", {
      month: "long",
    });
    acc[month] = (acc[month] || 0) + amount;
    return acc;
  }, {});

  // Sort months and create sorted data
  const sortedMonths = Object.keys(monthlyTotals).sort(sortMonths);
  const sortedAmounts = sortedMonths.map((month) => monthlyTotals[month]);

  const lineChartData = {
    labels: sortedMonths,
    datasets: [
      {
        label: "Monthly Expenses",
        data: sortedAmounts,
        borderColor: "#2196f3",
        backgroundColor: "rgba(33, 150, 243, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#2196f3",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#2196f3",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const totalExpense = safeExpenses.reduce(
    (total, expense) => total + (Number(expense.amount) || 0),
    0
  );

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              Total Expenses
            </Typography>
            <Typography variant="h3" color="primary">
              ${totalExpense.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Monthly Expenses
            </Typography>
            <Box sx={{ position: "relative", height: "300px", width: "100%" }}>
              {safeExpenses.length > 0 ? (
                <Line
                  data={lineChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              ) : (
                <Typography
                  variant="body1"
                  sx={{ textAlign: "center", pt: 10 }}
                >
                  No expense data available
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Expenses by Category
            </Typography>
            <Box sx={{ position: "relative", height: "300px", width: "100%" }}>
              {safeExpenses.length > 0 ? (
                <Pie
                  data={pieChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "right",
                      },
                    },
                  }}
                />
              ) : (
                <Typography
                  variant="body1"
                  sx={{ textAlign: "center", pt: 10 }}
                >
                  No expense data available
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Expenses
            </Typography>
            {safeExpenses.length > 0 ? (
              safeExpenses.slice(0, 5).map((expense) => (
                <Box
                  key={expense._id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1,
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1">
                      {expense.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {expense.category} •{" "}
                      {new Date(expense.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="primary">
                    ${Number(expense.amount).toFixed(2)}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                No recent expenses
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ExpenseDashboard;
