/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/


import { useReducer } from "react";

const primaryBalance = 5000;
const initialState = {
  balance: 0,
  loan: null,
  hasLoan: false,
  isActive: false,
  deposit: null,
  withdraw: null,
};
function reducer(state, action) {
  if (!state.isActive && action.type !== "active") return state;
  switch (action.type) {
    case "active":
      return {
        ...state,
        isActive: true,
        balance: primaryBalance,
        
      };

    case "notActive":
      return { ...state, isActive: (state.isActive = false) };

    case "deposit":
      return {
        ...state,
        deposit:
          action.payload >= 100 && action.payload <= 5000 ? action.payload : 0,
      };
    case "loan":
      return {
        ...state,
        loan:
          !state.hasLoan && action.payload >= 5000 && action.payload <= 50000
            ? action.payload
            : state.hasLoan
            ? 0
            : 0,
      };

    case "withdraw":
      return {
        ...state,
        withdraw:
          action.payload >= 50 &&
          action.payload <= 5000 &&
          action.payload <= state.balance
            ? action.payload
            : 0,
      };
    case "operationDeposit":
      return {
        ...state,
        balance: state.balance + state.deposit,
      };
    case "operationwithdraw":
      return {
        ...state,
        balance:
          state.balance >= state.withdraw
            ? state.balance - state.withdraw
            : (state.withdraw = 0),
      };
    case "operationLoan":
      return {
        ...state,
        balance:
          state.hasLoan === false ? state.balance + state.loan : state.balance,
        hasLoan: true,
      };
    case "operationPayloan":
      return {
        ...state,
        balance: state.balance - state.loan,
        hasLoan: false,
        loan: 0,
      };

    case "close":
      return {
        ...state,
        isActive: !state.hasLoan && state.balance === 0 ? false : true,
        deposit: null,
        withdraw: null,
      };
    default:
      throw new Error("Error");
  }
}

export default function App() {
  const [state, dipatch] = useReducer(reducer, initialState);
  const { balance, loan, isActive, deposit, withdraw, hasLoan } = state;
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {hasLoan ? loan : 0}</p>

      <p>
        <button onClick={() => dipatch({ type: "active" })} disabled={isActive}>
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dipatch({ type: "operationDeposit" })}
          disabled={!isActive}
        >
          Deposit:{" "}
        </button>
        <input
          type="number"
          max={5000}
          min={100}
          placeholder="100-5000"
          disabled={!isActive}
          onChange={(e) =>
            dipatch({ type: "deposit", payload: Number(e.target.value) })
          }
        />
        {deposit === 0 && (
          <span className="popup">Invalid input please enter 100-5000</span>
        )}
      </p>
      <p>
        <button
          onClick={() => dipatch({ type: "operationwithdraw" })}
          disabled={!isActive}
        >
          Withdraw:{" "}
        </button>
        <input
          type="number"
          max={5000}
          min={50}
          placeholder="50-5000"
          disabled={!isActive}
          onChange={(e) =>
            dipatch({ type: "withdraw", payload: Number(e.target.value) })
          }
        />
        {withdraw === 0 && (
          <span className="popup">
            Invalid input please enter 50-5000 and lower than Balance
          </span>
        )}
      </p>
      <p>
        <button
          onClick={() => dipatch({ type: "operationLoan" })}
          disabled={!isActive}
        >
          Request a loan of{" "}
        </button>
        <input
          type="number"
          max={10000}
          min={5000}
          placeholder="5k-10k"
          disabled={!isActive}
          onChange={(e) =>
            dipatch({ type: "loan", payload: Number(e.target.value) })
          }
        />
        {hasLoan === true && (
          <span className="popup">
            Invalid input please enter 5k-50k or Pay loan
          </span>
        )}
      </p>
      <p>
        <button
          onClick={() => dipatch({ type: "operationPayloan" })}
          disabled={!isActive}
        >
          Pay loan
        </button>
        
      </p>
      <p>
        <button onClick={() => dipatch({ type: "close" })} disabled={!isActive}>
          Close account
        </button>
      </p>
    </div>
  );
}
