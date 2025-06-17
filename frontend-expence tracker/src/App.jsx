import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { Home } from './pages/Dashboard/Home';
import { Login } from './pages/Auth/SignUp';
import { Home } from './pages/Auth/Login';
import {Income } from './pages/Dashboard/Income';
import { Expemse } from './pages/Dashboard/Expense';


function App() {
  return (
    <div>

      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard/income" element={<Income />} />
          <Route path="/dashboard/expense" element={<Expense />} />


        </Routes>
      </Router>

    </div>
  );
};

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Replace with actual authentication logic

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};
