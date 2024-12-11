import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const CATEGORIES = [
  'Transportation', 
  'Groceries', 
  'Shopping', 
  'Clothes', 
  'Food', 
  'Entertainment'
];

const ExpenseTrackerApp = () => {
  const [monthlyBudget, setMonthlyBudget] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    description: ''
  });

  const addExpense = () => {
    if (!newExpense.category || !newExpense.amount) {
      alert('Please select a category and enter an amount');
      return;
    }

    const expenseEntry = {
      ...newExpense,
      date: new Date().toISOString(),
      amount: parseFloat(newExpense.amount)
    };

    setExpenses([...expenses, expenseEntry]);
    
    setNewExpense({
      category: '',
      amount: '',
      description: ''
    });
  };

  const calculateTotalSpending = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const calculateCategorySpending = () => {
    return expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-4">
        {/* Expense History Column */}
        <div className="w-1/3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] overflow-y-auto">
                {expenses.map((expense, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between p-2 border-b hover:bg-gray-100"
                  >
                    <span className="font-medium">{expense.category}</span>
                    <span className="text-green-600">${expense.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Spending</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(calculateCategorySpending()).map(([category, total]) => (
                <div key={category} className="flex justify-between p-2 border-b">
                  <span>{category}</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Tracking Column */}
        <div className="w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Comprehensive Expense Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3>Monthly Budget: ${monthlyBudget}</h3>
                <h3>Total Spending: ${calculateTotalSpending().toFixed(2)}</h3>
              </div>

              {/* Expense Entry Form */}
              <div className="mb-4 p-4 border rounded">
                <h4>Add New Expense</h4>
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                  className="w-full p-2 mb-2 border rounded"
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Amount"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Description (Optional)"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  className="w-full p-2 mb-2 border rounded"
                />
                <Button onClick={addExpense} className="w-full">
                  Add Expense
                </Button>
              </div>

              {/* Spending Trend Graph */}
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={expenses}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTrackerApp;