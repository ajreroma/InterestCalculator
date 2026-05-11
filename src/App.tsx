/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wallet, 
  Percent, 
  Calendar, 
  Clock, 
  TrendingUp, 
  CircleDollarSign,
  Info
} from 'lucide-react';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export default function App() {
  const [principal, setPrincipal] = useState<number>(10000);
  const [apr, setApr] = useState<number>(5.25);

  const results = useMemo(() => {
    const rateAsDecimal = apr / 100;
    const yearly = principal * rateAsDecimal;
    const monthly = yearly / 12;
    const daily = yearly / 365;

    return {
      yearly,
      monthly,
      daily,
      threeMonths: monthly * 3,
      sixMonths: monthly * 6,
    };
  }, [principal, apr]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">InterestPro</span>
        </div>
        <div className="hidden md:flex space-x-6 text-sm font-medium text-slate-500">
          <span className="text-blue-600 border-b-2 border-blue-600 py-5">Calculator</span>
          <span className="cursor-pointer hover:text-slate-800 transition-colors">Projections</span>
          <span className="cursor-pointer hover:text-slate-800 transition-colors">History</span>
          <span className="cursor-pointer hover:text-slate-800 transition-colors">Settings</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Estimates
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-8"
          >
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Investment Parameters</h2>
            <div className="space-y-6">
              <div className="input-group">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Principal Amount (₱)
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₱</span>
                  <input
                    type="number"
                    value={principal || ''}
                    onChange={(e) => setPrincipal(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-lg font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all font-mono"
                    placeholder="10,000.00"
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Annual Interest Rate (%)
                </label>
                <div className="relative group">
                  <input
                    type="number"
                    step="0.01"
                    value={apr || ''}
                    onChange={(e) => setApr(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-lg font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all font-mono"
                    placeholder="5.25"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">% p.a.</span>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                  onClick={() => {/* Logic is reactive, this just feels good */}}
                >
                  <TrendingUp className="w-4 h-4" />
                  Recalculate Yield
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6 bg-slate-50 border-dashed border-slate-200 shadow-none"
          >
            <div className="flex items-center space-x-3 text-slate-600 mb-3">
              <Info className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold uppercase tracking-wide">Financial Disclosure</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Daily interest is calculated using a standard 365-day year convention. Our calculator provides simple interest estimations; actual bank yields may vary based on exact compounding frequency (daily, monthly, quarterly).
            </p>
          </motion.div>
        </div>

        {/* Right Column: Results & Projections */}
        <div className="lg:col-span-7 h-full flex flex-col space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-8 border-l-4 border-l-blue-500"
            >
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                Monthly Accrual
              </label>
              <div className="text-4xl font-bold text-slate-800 stat-value">
                {formatCurrency(results.monthly)}
              </div>
              <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 1 }}
                  className="h-full bg-blue-500" 
                />
              </div>
              <p className="mt-4 text-xs text-slate-500 italic flex items-center gap-1">
                <Calendar size={12} />
                Estimated based on average 30.4 days
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-8 border-l-4 border-l-emerald-500"
            >
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                Daily Accrual
              </label>
              <div className="text-4xl font-bold text-slate-800 stat-value">
                {formatCurrency(results.daily)}
              </div>
              <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "40%" }}
                  transition={{ duration: 1 }}
                  className="h-full bg-emerald-500" 
                />
              </div>
              <p className="mt-4 text-xs text-slate-500 italic flex items-center gap-1">
                <Clock size={12} />
                Standard 365-day calculation
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card flex-1 p-8"
          >
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
              <TrendingUp size={16} className="text-blue-600" />
              12-Month Accumulation Forecast
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-slate-600">3 Months Projection</span>
                <span className="font-mono font-bold text-slate-800 text-lg">
                  {formatCurrency(results.threeMonths)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-slate-600">6 Months Projection</span>
                <span className="font-mono font-bold text-slate-800 text-lg">
                  {formatCurrency(results.sixMonths)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-slate-600 font-semibold">1 Year Projection</span>
                <span className="font-mono font-bold text-blue-600 text-2xl">
                  {formatCurrency(results.yearly)}
                </span>
              </div>
              
              <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center md:text-left">
                  <div className="text-blue-900 font-bold">Total Return at Maturity</div>
                  <div className="text-blue-700 text-sm">Initial Principal + Accumulated Interest</div>
                </div>
                <div className="text-3xl font-black text-blue-900 stat-value">
                  {formatCurrency(principal + results.yearly)}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-12 bg-slate-800 text-slate-400 flex items-center justify-between px-8 text-[10px] uppercase tracking-widest shrink-0 font-medium mt-auto">
        <span>System Status: Operational</span>
        <span>Data Refreshed: {new Date().toISOString().split('T')[0]}</span>
        <span>InterestPro v2.1.0</span>
      </footer>
    </div>
  );
}
