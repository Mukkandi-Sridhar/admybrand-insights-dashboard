'use client';

import { useState, useEffect } from 'react';
import { KPICards } from '@/components/dashboard/kpi-cards';
import { ChartsSection } from '@/components/dashboard/charts-section';
import { CampaignsTable } from '@/components/dashboard/campaigns-table';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSkeleton } from '@/components/dashboard/dashboard-skeleton';
import { AnalyticsOverview } from '@/components/dashboard/analytics-overview';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { PerformanceMetrics } from '@/components/dashboard/performance-metrics';
import { motion } from 'framer-motion';

interface DashboardData {
  kpis: {
    revenue: number;
    users: number;
    conversions: number;
    growth: number;
    revenueChange: number;
    usersChange: number;
    conversionsChange: number;
    growthChange: number;
  };
  charts: {
    revenue: Array<{ week: string; revenue: number; target: number }>;
    usersByChannel: Array<{ channel: string; users: number; growth: number }>;
    conversionMix: Array<{ name: string; value: number; color: string; change: number }>;
    performanceMetrics: Array<{ metric: string; current: number; previous: number; target: number }>;
  };
  campaigns: Array<{
    id: string;
    name: string;
    channel: string;
    spend: number;
    conversions: number;
    cpa: number;
    status: 'active' | 'paused' | 'completed';
    roi: number;
    impressions: number;
    clicks: number;
    ctr: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: 'campaign_created' | 'budget_updated' | 'conversion' | 'alert';
    message: string;
    timestamp: string;
    severity: 'info' | 'success' | 'warning' | 'error';
  }>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (showRefreshing = false) => {
    try {
      if (showRefreshing) setRefreshing(true);
      else setLoading(true);
      
      // Simulate network delay for loading state
      await new Promise(resolve => setTimeout(resolve, showRefreshing ? 500 : 1200));
      
      const response = await fetch('/api/data');
      const dashboardData = await response.json();
      setData(dashboardData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData(true);
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="text-muted-foreground text-lg">Failed to load dashboard data</p>
          <button 
            onClick={() => fetchData()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <motion.div 
        className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <DashboardHeader onRefresh={handleRefresh} refreshing={refreshing} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <KPICards 
            revenue={data.kpis.revenue}
            users={data.kpis.users}
            conversions={data.kpis.conversions}
            growth={data.kpis.growth}
            revenueChange={data.kpis.revenueChange}
            usersChange={data.kpis.usersChange}
            conversionsChange={data.kpis.conversionsChange}
            growthChange={data.kpis.growthChange}
          />
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <motion.div variants={itemVariants} className="xl:col-span-3">
            <ChartsSection 
              revenueData={data.charts.revenue}
              usersData={data.charts.usersByChannel}
              conversionData={data.charts.conversionMix}
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-6">
            <QuickActions />
            <RecentActivity activities={data.recentActivity} />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <CampaignsTable campaigns={data.campaigns} />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <PerformanceMetrics metrics={data.charts.performanceMetrics} />
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <AnalyticsOverview />
        </motion.div>
      </motion.div>
    </div>
  );
}