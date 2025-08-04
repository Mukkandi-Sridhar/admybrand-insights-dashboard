'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Users, 
  Target, 
  TrendingUp, 
  Calendar,
  Download,
  Share,
  Filter
} from 'lucide-react';

export function AnalyticsOverview() {
  const insights = [
    {
      title: 'Top Performing Channel',
      value: 'Google Ads',
      metric: '3.2x ROI',
      trend: '+15.3%',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Best Converting Campaign',
      value: 'Summer Sale',
      metric: '247 conversions',
      trend: '+8.7%',
      icon: Target,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Highest Traffic Source',
      value: 'Organic Search',
      metric: '3,245 users',
      trend: '+12.5%',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const recommendations = [
    {
      priority: 'High',
      title: 'Increase Budget for Retargeting Campaign',
      description: 'This campaign has the lowest CPA ($34.24) and highest ROI (4.1x)',
      action: 'Increase Budget'
    },
    {
      priority: 'Medium',
      title: 'Optimize Product Launch Campaign',
      description: 'High CPA ($142.13) suggests need for audience refinement',
      action: 'Optimize Targeting'
    },
    {
      priority: 'Low',
      title: 'Expand Email Marketing',
      description: 'Excellent performance with 5.2x ROI and low CPA',
      action: 'Scale Campaign'
    }
  ];

  const getPriorityColor = (priority: string) => {
    const colors = {
      'High': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'Medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'Low': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
    };
    return colors[priority as keyof typeof colors] || colors.Low;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Key Insights */}
      <Card className="border-0 bg-gradient-to-br from-card to-card/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Key Insights
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Last 30 days
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${insight.color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-muted-foreground">{insight.title}</h4>
                  <p className="font-bold text-lg">{insight.value}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium">{insight.metric}</span>
                    <Badge variant="secondary" className="text-xs text-green-600">
                      {insight.trend}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-0 bg-gradient-to-br from-card to-card/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">AI Recommendations</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-4 rounded-lg border border-border/50 hover:border-border transition-colors">
              <div className="flex items-start justify-between mb-3">
                <Badge 
                  variant="secondary" 
                  className={getPriorityColor(rec.priority)}
                >
                  {rec.priority} Priority
                </Badge>
                <Button variant="outline" size="sm">
                  {rec.action}
                </Button>
              </div>
              <h4 className="font-medium text-sm mb-2">{rec.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {rec.description}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}