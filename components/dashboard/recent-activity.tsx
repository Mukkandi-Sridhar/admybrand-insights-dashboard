'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { 
  Plus, 
  DollarSign, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Info,
  TrendingUp
} from 'lucide-react';

interface Activity {
  id: string;
  type: 'campaign_created' | 'budget_updated' | 'conversion' | 'alert';
  message: string;
  timestamp: string;
  severity: 'info' | 'success' | 'warning' | 'error';
}

interface RecentActivityProps {
  activities: Activity[];
}

const getActivityIcon = (type: string) => {
  const icons = {
    campaign_created: Plus,
    budget_updated: DollarSign,
    conversion: Target,
    alert: AlertTriangle
  };
  return icons[type as keyof typeof icons] || Info;
};

const getSeverityColor = (severity: string) => {
  const colors = {
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
  };
  return colors[severity as keyof typeof colors] || colors.info;
};

const getIconColor = (severity: string) => {
  const colors = {
    info: 'from-blue-500 to-blue-600',
    success: 'from-green-500 to-green-600',
    warning: 'from-yellow-500 to-yellow-600',
    error: 'from-red-500 to-red-600'
  };
  return colors[severity as keyof typeof colors] || colors.info;
};

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="border-0 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-start gap-3 group">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${getIconColor(activity.severity)} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-relaxed">
                      {activity.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getSeverityColor(activity.severity)}`}
                      >
                        {activity.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}