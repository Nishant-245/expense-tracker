import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  AddCircle,
  List as ListIcon,
  ShowChart,
} from "@mui/icons-material";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseTotal from "./components/ExpenseTotal";
import ExpenseDashboard from "./components/ExpenseDashboard";
import ExpenseSummary from "./components/ExpenseSummary";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    date: "",
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  const fetchExpenses = async () => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(
      `http://localhost:5000/api/expenses?${queryParams}`
    );
    const data = await response.json();
    setExpenses(data);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, view: "dashboard" },
    { text: "Add Expense", icon: <AddCircle />, view: "add" },
    { text: "Expenses List", icon: <ListIcon />, view: "list" },
    { text: "Summary", icon: <ShowChart />, view: "summary" },
  ];

  const drawer = (
    <Box sx={{ mt: 8 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              setCurrentView(item.view);
              if (isMobile) setMobileOpen(false);
            }}
            sx={{
              backgroundColor:
                currentView === item.view
                  ? theme.palette.primary.light + "20"
                  : "transparent",
              borderRadius: 2,
              mx: 1,
              mb: 1,
            }}
          >
            <ListItemIcon sx={{ color: theme.palette.primary.main }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <ExpenseDashboard expenses={expenses} />;
      case "add":
        return <ExpenseForm onExpenseAdded={fetchExpenses} />;
      case "list":
        return (
          <>
            <ExpenseFilter onFilterChange={setFilters} />
            <ExpenseList expenses={expenses} />
          </>
        );
      case "summary":
        return <ExpenseSummary expenses={expenses} />;
      default:
        return <ExpenseDashboard expenses={expenses} />;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: (theme) => `
          linear-gradient(120deg, ${theme.palette.background.default} 0%, #ffffff 100%)
        `,
        "&::before": {
          content: '""',
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.4,
          zIndex: -1,
          background: `
            radial-gradient(circle at 25% 25%, rgba(33, 150, 243, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(33, 150, 243, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255, 64, 129, 0.05) 0%, transparent 50%)
          `,
        },
      }}
    >
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Expense Tracker
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          mt: 8,
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
}

export default App;
