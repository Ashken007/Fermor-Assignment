/**
 * Indian Rupee formatter utility functions for FERMOR
 */

export function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactINR(value: number): string {
  if (value >= 10000000) {
    const cr = value / 10000000;
    return `₹${cr.toFixed(2).replace(/\.00$/, "")}Cr`;
  }
  if (value >= 100000) {
    const lakh = value / 100000;
    return `₹${lakh.toFixed(2).replace(/\.00$/, "")}L`;
  }
  if (value >= 1000) {
    const k = value / 1000;
    return `₹${k.toFixed(1).replace(/\.0$/, "")}K`;
  }
  return `₹${Math.round(value)}`;
}

export function calculateSIP(
  monthlyInvestment: number,
  annualRate: number,
  years: number
) {
  const months = years * 12;
  const monthlyRate = annualRate / 12 / 100;
  
  // Compound monthly formula: FV = P * [((1 + i)^n - 1) / i] * (1 + i)
  const totalInvested = monthlyInvestment * months;
  let futureValue = 0;
  
  if (monthlyRate === 0) {
    futureValue = totalInvested;
  } else {
    futureValue =
      monthlyInvestment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);
  }
  
  const estimatedReturns = Math.max(0, futureValue - totalInvested);
  
  // Generate yearly dataset for interactive chart
  const yearlyData = [];
  for (let year = 1; year <= years; year++) {
    const m = year * 12;
    const invested = monthlyInvestment * m;
    const fv =
      monthlyInvestment *
      ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) *
      (1 + monthlyRate);
    const returns = fv - invested;
    
    yearlyData.push({
      year,
      invested: Math.round(invested),
      returns: Math.round(returns),
      futureValue: Math.round(fv),
    });
  }

  return {
    totalInvested: Math.round(totalInvested),
    estimatedReturns: Math.round(estimatedReturns),
    futureValue: Math.round(futureValue),
    yearlyData,
  };
}
