import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import Cashflow from './Cashflow';
import Assets from './Assets';
import BudgetPlan from './BudgetPlan';
import Settings from './Settings';

const MainContent: React.FC = () => {
  const location = useLocation();

  return (
    <div className="layout__contents">
      <Routes location={location}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cashflow" element={<Cashflow />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/budget-plan" element={<BudgetPlan />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default MainContent;
