'use client';

import { BarChart3, TrendingUp, RefreshCw, Settings, Bell, Share2 } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { ExportDialog } from './export-dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface DashboardHeaderProps {
  onRefresh?: () => void;
  refreshing?: boolean;
  onExport?: (format: 'csv' | 'pdf' | 'excel', options: any) => void;
}

export function DashboardHeader({ onRefresh, refreshing, onExport }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
      <div className="flex items-center gap-4">
        <motion.div 
          className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <BarChart3 className="w-6 h-6" />
        </motion.div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Analytics Dashboard
            </h1>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Pro
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Monitor your marketing performance and insights
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden md:flex items-center gap-2 text-xs sm:text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={refreshing}
            className="transition-all duration-200 hover:scale-105"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline ml-2">Refresh</span>
          </Button>
          
          {onExport && (
            <div className="hidden sm:block">
              <ExportDialog onExport={onExport} />
            </div>
          )}
          
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Share2 className="w-4 h-4" />
            <span className="ml-2">Share</span>
          </Button>
          
          <Button variant="outline" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            <span className="hidden sm:inline ml-2">Alerts</span>
          </Button>
          
          <Button variant="outline" size="sm" className="hidden lg:flex">
            <Settings className="w-4 h-4" />
            <span className="ml-2">Settings</span>
          </Button>
          
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}