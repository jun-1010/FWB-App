import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import IncomeExpense from './IncomeExpense';
import Portfolio from './Portfolio';
import BudgetPlan from './BudgetPlan';
import Settings from './Settings';

const MainContent: React.FC = () => {
  const location = useLocation();

  return (
    <div className="main-content">
      <Routes location={location}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/income-expense" element={<IncomeExpense />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/budget-plan" element={<BudgetPlan />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default MainContent;
