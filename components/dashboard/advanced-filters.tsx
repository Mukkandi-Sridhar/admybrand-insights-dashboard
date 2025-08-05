'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Filter, X, Download, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdvancedFiltersProps {
  filters: {
    dateRange: string;
    channels: string[];
    status: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function AdvancedFilters({ filters, onFiltersChange }: AdvancedFiltersProps) {
  const dateRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const channels = [
    'Google Ads',
    'Facebook Ads',
    'LinkedIn Ads',
    'YouTube Ads',
    'Email Marketing',
    'Instagram',
    'Organic Search'
  ];

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'paused', label: 'Paused' },
    { value: 'completed', label: 'Completed' }
  ];

  const handleChannelToggle = (channel: string) => {
    const newChannels = filters.channels.includes(channel)
      ? filters.channels.filter(c => c !== channel)
      : [...filters.channels, channel];
    
    onFiltersChange({
      ...filters,
      channels: newChannels
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      dateRange: '30d',
      channels: [],
      status: 'all'
    });
  };

  const activeFiltersCount = 
    (filters.dateRange !== '30d' ? 1 : 0) +
    filters.channels.length +
    (filters.status !== 'all' ? 1 : 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-0 bg-gradient-to-r from-card to-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold text-lg">Advanced Filters</h3>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount} active
                </Badge>
              )}
            </div>

            <div className="flex-1 flex flex-wrap gap-3">
              {/* Date Range Filter */}
              <Select 
                value={filters.dateRange} 
                onValueChange={(value) => onFiltersChange({ ...filters, dateRange: value })}
              >
                <SelectTrigger className="w-[160px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dateRanges.map(range => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select 
                value={filters.status} 
                onValueChange={(value) => onFiltersChange({ ...filters, status: value })}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Channel Filters */}
              <div className="flex flex-wrap gap-2">
                {channels.map(channel => (
                  <Button
                    key={channel}
                    variant={filters.channels.includes(channel) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleChannelToggle(channel)}
                    className="h-8 text-xs"
                  >
                    {channel}
                    {filters.channels.includes(channel) && (
                      <X className="w-3 h-3 ml-1" />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </Button>
              )}
              
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <motion.div 
              className="mt-4 pt-4 border-t border-border/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-wrap gap-2">
                {filters.dateRange !== '30d' && (
                  <Badge variant="secondary" className="gap-1">
                    Date: {dateRanges.find(r => r.value === filters.dateRange)?.label}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-destructive" 
                      onClick={() => onFiltersChange({ ...filters, dateRange: '30d' })}
                    />
                  </Badge>
                )}
                
                {filters.status !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    Status: {statuses.find(s => s.value === filters.status)?.label}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-destructive" 
                      onClick={() => onFiltersChange({ ...filters, status: 'all' })}
                    />
                  </Badge>
                )}
                
                {filters.channels.map(channel => (
                  <Badge key={channel} variant="secondary" className="gap-1">
                    {channel}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-destructive" 
                      onClick={() => handleChannelToggle(channel)}
                    />
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}