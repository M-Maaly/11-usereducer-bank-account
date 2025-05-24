# 🏦 useReducer Bank Account App

This is a simple React application that simulates a basic **bank account system** using the `useReducer` hook to manage complex state logic.

## 🚀 Features

- ✅ Open an account with an initial balance of 5000 EGP
- 💰 Deposit between 100 and 5000
- 💸 Withdraw between 50 and 5000 (as long as you have enough balance)
- 🏦 Request a loan (one-time only) between 5000 and 50,000
- 💳 Pay back the loan (even if it leads to a negative balance)
- ❌ Close the account (only if loan = 0 and balance = 0)

## 🧠 Technologies

- React
- JavaScript
- useReducer Hook
- HTML/CSS (basic styling)

## ⚙️ State Management

We use `useReducer` to handle the following state transitions:

- `active`: Open account
- `deposit`: Set deposit amount
- `operationDeposit`: Apply deposit to balance
- `withdraw`: Set withdraw amount
- `operationwithdraw`: Deduct withdraw from balance
- `loan`: Set loan amount
- `operationLoan`: Apply loan to balance
- `operationPayloan`: Pay off the loan
- `close`: Close the account

All actions except for `active` are only available if the account is **active**.

## 🖥️ Running the Project

### 1. Clone the repository

```bash
git clone https://github.com/your-username/useReducer-bank-app.git
cd useReducer-bank-app

## 📁 Folder Structure
src/
├── App.js         # Main React component
├── index.js       # Entry point
├── styles.css     # Optional: custom styling
