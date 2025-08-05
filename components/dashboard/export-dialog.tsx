'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Download, FileText, FileSpreadsheet, File } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExportDialogProps {
  onExport: (format: 'csv' | 'pdf' | 'excel', options: any) => void;
}

export function ExportDialog({ onExport }: ExportDialogProps) {
  const [format, setFormat] = useState<'csv' | 'pdf' | 'excel'>('csv');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeKPIs, setIncludeKPIs] = useState(true);
  const [includeCampaigns, setIncludeCampaigns] = useState(true);
  const [dateRange, setDateRange] = useState('current');
  const [open, setOpen] = useState(false);

  const formats = [
    {
      value: 'csv' as const,
      label: 'CSV',
      description: 'Comma-separated values for spreadsheet apps',
      icon: FileSpreadsheet,
      color: 'from-green-500 to-green-600'
    },
    {
      value: 'pdf' as const,
      label: 'PDF',
      description: 'Formatted report with charts and tables',
      icon: FileText,
      color: 'from-red-500 to-red-600'
    },
    {
      value: 'excel' as const,
      label: 'Excel',
      description: 'Microsoft Excel workbook with multiple sheets',
      icon: File,
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const handleExport = () => {
    const options = {
      includeCharts,
      includeKPIs,
      includeCampaigns,
      dateRange
    };
    
    onExport(format, options);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Dashboard Data
          </DialogTitle>
          <DialogDescription>
            Choose your export format and customize what data to include
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Format Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Export Format</Label>
            <RadioGroup value={format} onValueChange={(value: any) => setFormat(value)}>
              <div className="grid gap-3">
                {formats.map((formatOption) => {
                  const Icon = formatOption.icon;
                  return (
                    <motion.div
                      key={formatOption.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Label
                        htmlFor={formatOption.value}
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                          format === formatOption.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-border/80'
                        }`}
                      >
                        <RadioGroupItem value={formatOption.value} id={formatOption.value} />
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${formatOption.color}`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{formatOption.label}</span>
                            {formatOption.value === 'pdf' && (
                              <Badge variant="secondary" className="text-xs">
                                Recommended
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatOption.description}
                          </p>
                        </div>
                      </Label>
                    </motion.div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>

          {/* Data Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Include Data</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="kpis"
                  checked={includeKPIs}
                  onCheckedChange={setIncludeKPIs}
                />
                <Label htmlFor="kpis" className="text-sm">
                  KPI Cards & Metrics
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="charts"
                  checked={includeCharts}
                  onCheckedChange={setIncludeCharts}
                />
                <Label htmlFor="charts" className="text-sm">
                  Charts & Visualizations
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="campaigns"
                  checked={includeCampaigns}
                  onCheckedChange={setIncludeCampaigns}
                />
                <Label htmlFor="campaigns" className="text-sm">
                  Campaign Performance Table
                </Label>
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Date Range</Label>
            <RadioGroup value={dateRange} onValueChange={setDateRange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="current" id="current" />
                <Label htmlFor="current" className="text-sm">Current filtered period</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="30d" id="30d" />
                <Label htmlFor="30d" className="text-sm">Last 30 days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="90d" id="90d" />
                <Label htmlFor="90d" className="text-sm">Last 90 days</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport} className="gap-2">
            <Download className="w-4 h-4" />
            Export {format.toUpperCase()}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}