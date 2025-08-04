'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';

interface Metric {
  metric: string;
  current: number;
  previous: number;
  target: number;
}

interface PerformanceMetricsProps {
  metrics: Metric[];
}

export function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  const getProgressValue = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getChangePercentage = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100;
  };

  const formatMetricValue = (metric: string, value: number) => {
    switch (metric) {
      case 'CTR':
        return `${value.toFixed(1)}%`;
      case 'CPC':
        return `$${value.toFixed(2)}`;
      case 'ROAS':
        return `${value.toFixed(1)}x`;
      case 'Quality Score':
        return value.toFixed(1);
      default:
        return value.toString();
    }
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Target className="w-5 h-5" />
          Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric, index) => {
          const progressValue = getProgressValue(metric.current, metric.target);
          const changePercentage = getChangePercentage(metric.current, metric.previous);
          const isPositive = changePercentage >= 0;
          const isGoodChange = metric.metric === 'CPC' ? !isPositive : isPositive;

          return (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">{metric.metric}</h4>
                  <p className="text-xs text-muted-foreground">
                    Target: {formatMetricValue(metric.metric, metric.target)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">
                    {formatMetricValue(metric.metric, metric.current)}
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${
                    isGoodChange ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {Math.abs(changePercentage).toFixed(1)}%
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Progress 
                  value={progressValue} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Previous: {formatMetricValue(metric.metric, metric.previous)}</span>
                  <span>{progressValue.toFixed(0)}% of target</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}