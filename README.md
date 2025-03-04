# Expense Tracker

A modern expense tracking application built with MERN stack (MongoDB, Express.js, React.js, Node.js) that helps users manage and visualize their expenses.

## Features

- 📊 Interactive Dashboard with Charts
- 💰 Track Daily, Weekly, Monthly, and Yearly Expenses
- 📱 Responsive Design
- 🎨 Modern UI with Material Design
- 📈 Visual Data Representation
- 🔍 Filter and Search Expenses
- 📅 Date-wise Expense Tracking
- 📊 Category-wise Analysis

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)
- npm (comes with Node.js)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd expense-tracker
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend directory and add:
MONGODB_URI=mongodb://localhost:27017/expense-tracker
PORT=5000

# Start the backend server
npm start
```

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
```

The application should now be running at:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
expense-tracker/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Technologies Used

### Frontend

- React.js
- Material-UI
- Chart.js
- React Router
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Cors

## API Endpoints

### Expenses

- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `GET /api/expenses?category=food` - Get expenses by category
- `GET /api/expenses?date=2024-03-01` - Get expenses by date

## Environment Variables

### Backend (.env)

```
MONGODB_URI=mongodb://localhost:27017/expense-tracker
PORT=5000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Ensure MongoDB is running locally
   - Check MongoDB connection string in .env file

2. **Port Already in Use**

   - Change the port in .env file
   - Kill the process using the port

3. **Module Not Found**
   - Run `npm install` in both frontend and backend directories
   - Check package.json for missing dependencies

For more help, please open an issue in the repository.
