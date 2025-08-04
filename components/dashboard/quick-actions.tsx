'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Download, Settings, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export function QuickActions() {
  const actions = [
    {
      icon: Plus,
      label: 'New Campaign',
      description: 'Create campaign',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Upload,
      label: 'Import Data',
      description: 'Upload CSV',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Target,
      label: 'Set Goals',
      description: 'Define targets',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Zap,
      label: 'Optimize',
      description: 'Auto-optimize',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <Card className="border-0 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="ghost"
                className="w-full justify-start h-auto p-3 hover:bg-muted/50 transition-all duration-200 group"
              >
                <div className={`p-2 rounded-lg bg-gradient-to-br ${action.color} mr-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm">{action.label}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}