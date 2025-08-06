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
import { AdvancedFilters } from '@/components/dashboard/advanced-filters';
import { ExportDialog } from '@/components/dashboard/export-dialog';
import { NotificationCenter } from '@/components/dashboard/notification-center';
import { BrandHeader } from '@/components/dashboard/brand-header';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'sonner';

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
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timestamp: string;
    read: boolean;
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
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    dateRange: '30d',
    channels: [] as string[],
    status: 'all'
  });

  const fetchData = async (showRefreshing = false) => {
    try {
      if (showRefreshing) {
        setRefreshing(true);
        toast.info('Refreshing dashboard data...');
      } else {
        setLoading(true);
      }
      
      setError(null);
      
      // Simulate network delay for loading state
      await new Promise(resolve => setTimeout(resolve, showRefreshing ? 800 : 1500));
      
      const response = await fetch('/api/data');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const dashboardData = await response.json();
      setData(dashboardData);
      
      if (showRefreshing) {
        toast.success('Dashboard data updated successfully!');
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load dashboard data';
      setError(errorMessage);
      toast.error(errorMessage);
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

  const handleExport = async (format: 'csv' | 'pdf' | 'excel') => {
    try {
      toast.info(`Preparing ${format.toUpperCase()} export...`);
      
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`${format.toUpperCase()} export completed successfully!`);
    } catch (error) {
      toast.error('Export failed. Please try again.');
    }
  };

  const handleCampaignAction = async (campaignId: string, action: string) => {
    try {
      toast.info(`${action} campaign...`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local data
      if (data) {
        const updatedCampaigns = data.campaigns.map(campaign => {
          if (campaign.id === campaignId) {
            return {
              ...campaign,
              status: action === 'pause' ? 'paused' as const : 
                     action === 'resume' ? 'active' as const : campaign.status
            };
          }
          return campaign;
        });
        
        setData({
          ...data,
          campaigns: updatedCampaigns
        });
      }
      
      toast.success(`Campaign ${action}d successfully!`);
    } catch (error) {
      toast.error(`Failed to ${action} campaign. Please try again.`);
    }
  };

  const handleQuickAction = async (action: string) => {
    try {
      toast.info(`Executing ${action}...`);
      
      // Simulate action
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`${action} completed successfully!`);
    } catch (error) {
      toast.error(`Failed to execute ${action}. Please try again.`);
    }
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="text-center space-y-6 max-w-md mx-auto p-6">
          <div className="w-20 h-20 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
            <span className="text-3xl">⚠️</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Dashboard Error</h2>
            <p className="text-muted-foreground text-lg mb-4">
              {error || 'Failed to load dashboard data'}
            </p>
          </div>
          <button 
            onClick={() => fetchData()}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <Toaster position="top-right" richColors />
      
      <motion.div 
        className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <BrandHeader />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardHeader 
            onRefresh={handleRefresh} 
            refreshing={refreshing}
            onExport={handleExport}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <AdvancedFilters 
            filters={filters}
            onFiltersChange={setFilters}
          />
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
            <QuickActions onAction={handleQuickAction} />
            <RecentActivity activities={data.recentActivity} />
            <NotificationCenter notifications={data.notifications} />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <CampaignsTable 
              campaigns={data.campaigns}
              onCampaignAction={handleCampaignAction}
            />
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