'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChartsSectionProps {
  revenueData: Array<{ week: string; revenue: number; target: number }>;
  usersData: Array<{ channel: string; users: number; growth: number }>;
  conversionData: Array<{ name: string; value: number; color: string; change: number }>;
}

const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3">
        <p className="font-medium text-card-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.dataKey}:</span>
            <span className="font-medium">
              {formatter ? formatter(entry.value, entry.dataKey) : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function ChartsSection({ revenueData, usersData, conversionData }: ChartsSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Enhanced Revenue Chart */}
      <Card className="xl:col-span-2 transition-all duration-200 hover:shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              Revenue vs Target
              <Badge variant="secondary" className="text-xs">
                +12.5%
              </Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Weekly performance comparison
            </p>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="week" 
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  content={<CustomTooltip formatter={(value: number) => `$${value.toLocaleString()}`} />}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  fill="url(#targetGradient)"
                  strokeDasharray="5 5"
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Users Chart */}
      <Card className="transition-all duration-200 hover:shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Traffic Sources</CardTitle>
          <p className="text-sm text-muted-foreground">User acquisition by channel</p>
        </CardHeader>
        <CardContent>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usersData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  type="number"
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value/1000}k`}
                />
                <YAxis 
                  type="category"
                  dataKey="channel"
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                  width={100}
                />
                <Tooltip 
                  content={<CustomTooltip formatter={(value: number) => value.toLocaleString()} />}
                />
                <Bar 
                  dataKey="users" 
                  fill="hsl(var(--primary))"
                  radius={[0, 4, 4, 0]}
                  className="hover:opacity-80 transition-opacity"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {usersData.slice(0, 3).map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.channel}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.users.toLocaleString()}</span>
                  <div className={`flex items-center gap-1 ${
                    item.growth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span className="text-xs">{Math.abs(item.growth)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Conversion Chart */}
      <Card className="lg:col-span-2 xl:col-span-1 transition-all duration-200 hover:shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Conversion Breakdown</CardTitle>
          <p className="text-sm text-muted-foreground">Distribution by type</p>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={conversionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {conversionData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  content={<CustomTooltip formatter={(value: number) => `${value}%`} />}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {conversionData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{item.value}%</span>
                  <div className={`flex items-center gap-1 text-xs ${
                    item.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(item.change)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}