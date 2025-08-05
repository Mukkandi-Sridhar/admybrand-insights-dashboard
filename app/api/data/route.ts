import { NextResponse } from 'next/server';

const dashboardData = {
  kpis: {
    revenue: 152420,
    users: 8943,
    conversions: 1247,
    growth: 12.5,
    revenueChange: 12.5,
    usersChange: 8.2,
    conversionsChange: 4.1,
    growthChange: 2.3
  },
  charts: {
    revenue: [
      { week: 'Week 1', revenue: 25000, target: 24000 },
      { week: 'Week 2', revenue: 28500, target: 26000 },
      { week: 'Week 3', revenue: 31200, target: 28000 },
      { week: 'Week 4', revenue: 29800, target: 30000 },
      { week: 'Week 5', revenue: 35400, target: 32000 },
      { week: 'Week 6', revenue: 38700, target: 34000 },
      { week: 'Week 7', revenue: 42300, target: 36000 },
      { week: 'Week 8', revenue: 39900, target: 38000 }
    ],
    usersByChannel: [
      { channel: 'Organic Search', users: 3245, growth: 12.5 },
      { channel: 'Paid Search', users: 2156, growth: 8.3 },
      { channel: 'Social Media', users: 1876, growth: -2.1 },
      { channel: 'Email', users: 987, growth: 15.7 },
      { channel: 'Direct', users: 679, growth: 5.2 }
    ],
    conversionMix: [
      { name: 'Email Signup', value: 45, color: '#8884d8', change: 5.2 },
      { name: 'Purchase', value: 25, color: '#82ca9d', change: -1.3 },
      { name: 'Demo Request', value: 20, color: '#ffc658', change: 8.7 },
      { name: 'Newsletter', value: 10, color: '#ff7c7c', change: 2.1 }
    ],
    performanceMetrics: [
      { metric: 'CTR', current: 3.2, previous: 2.8, target: 3.5 },
      { metric: 'CPC', current: 1.45, previous: 1.52, target: 1.40 },
      { metric: 'ROAS', current: 4.2, previous: 3.8, target: 4.5 },
      { metric: 'Quality Score', current: 8.1, previous: 7.9, target: 8.5 }
    ]
  },
  campaigns: [
    {
      id: '1',
      name: 'Summer Sale Campaign',
      channel: 'Google Ads',
      spend: 15420,
      conversions: 247,
      cpa: 62.43,
      status: 'active' as const,
      roi: 3.2,
      impressions: 125000,
      clicks: 3200,
      ctr: 2.56
    },
    {
      id: '2', 
      name: 'Brand Awareness Drive',
      channel: 'Facebook Ads',
      spend: 8930,
      conversions: 156,
      cpa: 57.24,
      status: 'active' as const,
      roi: 2.8,
      impressions: 89000,
      clicks: 2100,
      ctr: 2.36
    },
    {
      id: '3',
      name: 'Product Launch',
      channel: 'LinkedIn Ads',
      spend: 12650,
      conversions: 89,
      cpa: 142.13,
      status: 'paused' as const,
      roi: 1.9,
      impressions: 45000,
      clicks: 890,
      ctr: 1.98
    },
    {
      id: '4',
      name: 'Retargeting Campaign',
      channel: 'Google Ads',
      spend: 6780,
      conversions: 198,
      cpa: 34.24,
      status: 'active' as const,
      roi: 4.1,
      impressions: 67000,
      clicks: 1890,
      ctr: 2.82
    },
    {
      id: '5',
      name: 'Video Marketing',
      channel: 'YouTube Ads',
      spend: 18900,
      conversions: 312,
      cpa: 60.58,
      status: 'active' as const,
      roi: 3.5,
      impressions: 156000,
      clicks: 4200,
      ctr: 2.69
    },
    {
      id: '6',
      name: 'Email Nurture',
      channel: 'Email Marketing',
      spend: 2340,
      conversions: 145,
      cpa: 16.14,
      status: 'completed' as const,
      roi: 5.2,
      impressions: 23000,
      clicks: 1200,
      ctr: 5.22
    },
    {
      id: '7',
      name: 'Influencer Collab',
      channel: 'Instagram',
      spend: 9870,
      conversions: 176,
      cpa: 56.08,
      status: 'active' as const,
      roi: 2.9,
      impressions: 78000,
      clicks: 1950,
      ctr: 2.50
    },
    {
      id: '8',
      name: 'Content Marketing',
      channel: 'Organic Search',
      spend: 4560,
      conversions: 203,
      cpa: 22.46,
      status: 'active' as const,
      roi: 4.8,
      impressions: 95000,
      clicks: 2850,
      ctr: 3.00
    }
  ],
  recentActivity: [
    {
      id: '1',
      type: 'campaign_created' as const,
      message: 'New campaign "Holiday Promotion" created',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      severity: 'info' as const
    },
    {
      id: '2',
      type: 'conversion' as const,
      message: '50 new conversions from Summer Sale Campaign',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      severity: 'success' as const
    },
    {
      id: '3',
      type: 'budget_updated' as const,
      message: 'Budget increased for Video Marketing campaign',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      severity: 'info' as const
    },
    {
      id: '4',
      type: 'alert' as const,
      message: 'CPA threshold exceeded for Product Launch',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      severity: 'warning' as const
    },
    {
      id: '5',
      type: 'conversion' as const,
      message: 'Record daily conversions achieved!',
      timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      severity: 'success' as const
    }
  ],
  notifications: [
    {
      id: '1',
      title: 'Campaign Performance Alert',
      message: 'Summer Sale Campaign is performing 25% above target',
      type: 'success' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      read: false
    },
    {
      id: '2',
      title: 'Budget Threshold Warning',
      message: 'Video Marketing campaign has used 85% of monthly budget',
      type: 'warning' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      read: false
    },
    {
      id: '3',
      title: 'New Feature Available',
      message: 'Advanced audience insights now available in your dashboard',
      type: 'info' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      read: true
    }
  ]
};

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return NextResponse.json(dashboardData, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}