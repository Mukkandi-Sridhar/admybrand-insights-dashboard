'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, Target, Percent, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

interface KPICardsProps {
  revenue: number;
  users: number;
  conversions: number;
  growth: number;
  revenueChange: number;
  usersChange: number;
  conversionsChange: number;
  growthChange: number;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value);
};

const formatPercentage = (value: number) => {
  const isPositive = value >= 0;
  return {
    value: `${isPositive ? '+' : ''}${value.toFixed(1)}%`,
    isPositive,
    icon: isPositive ? TrendingUp : TrendingDown,
    color: isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
  };
};

export function KPICards({ 
  revenue, 
  users, 
  conversions, 
  growth,
  revenueChange,
  usersChange,
  conversionsChange,
  growthChange
}: KPICardsProps) {
  const kpis = [
    {
      title: 'Total Revenue',
      value: formatCurrency(revenue),
      icon: DollarSign,
      change: formatPercentage(revenueChange),
      description: 'vs last month',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Users',
      value: formatNumber(users),
      icon: Users,
      change: formatPercentage(usersChange),
      description: 'vs last month',
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Conversions',
      value: formatNumber(conversions),
      icon: Target,
      change: formatPercentage(conversionsChange),
      description: 'vs last month',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Growth Rate',
      value: `${growth}%`,
      icon: Percent,
      change: formatPercentage(growthChange),
      description: 'vs last month',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        const ChangeIcon = kpi.change.icon;
        
        return (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-xl border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <div className={`absolute inset-0 bg-gradient-to-br ${kpi.gradient} opacity-5`} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${kpi.gradient} shadow-lg`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {kpi.value}
                </div>
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-1 text-sm font-medium ${kpi.change.color}`}>
                    <ChangeIcon className="w-4 h-4" />
                    <span>{kpi.change.value}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {kpi.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}