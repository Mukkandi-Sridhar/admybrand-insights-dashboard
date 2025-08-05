'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  Filter,
  MoreHorizontal,
  Play,
  Pause,
  Eye,
  Edit
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Campaign {
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
}

interface CampaignsTableProps {
  campaigns: Campaign[];
  onCampaignAction: (campaignId: string, action: string) => void;
}

type SortKey = keyof Campaign;
type SortOrder = 'asc' | 'desc';

const getChannelColor = (channel: string) => {
  const colors: Record<string, string> = {
    'Google Ads': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'Facebook Ads': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    'LinkedIn Ads': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
    'YouTube Ads': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    'Email Marketing': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'Instagram': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
    'Organic Search': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  };
  return colors[channel] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
};

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'active': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'paused': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    'completed': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
  };
  return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
};

export function CampaignsTable({ campaigns, onCampaignAction }: CampaignsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [channelFilter, setChannelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const channels = useMemo(() => {
    const uniqueChannels = [...new Set(campaigns.map(c => c.channel))];
    return uniqueChannels.sort();
  }, [campaigns]);

  const statuses = useMemo(() => {
    const uniqueStatuses = [...new Set(campaigns.map(c => c.status))];
    return uniqueStatuses.sort();
  }, [campaigns]);

  const filteredAndSortedCampaigns = useMemo(() => {
    let filtered = campaigns.filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.channel.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesChannel = channelFilter === 'all' || campaign.channel === channelFilter;
      const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
      return matchesSearch && matchesChannel && matchesStatus;
    });

    return filtered.sort((a, b) => {
      let aValue = a[sortKey];
      let bValue = b[sortKey];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [campaigns, searchTerm, channelFilter, statusFilter, sortKey, sortOrder]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) {
      return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    }
    return sortOrder === 'asc' ? 
      <ArrowUp className="w-4 h-4" /> : 
      <ArrowDown className="w-4 h-4" />;
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-semibold">Campaign Performance</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and monitor your marketing campaigns
            </p>
          </div>
          <Badge variant="outline" className="w-fit">
            {filteredAndSortedCampaigns.length} campaigns
          </Badge>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search campaigns or channels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={channelFilter} onValueChange={setChannelFilter}>
              <SelectTrigger className="w-[160px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                {channels.map(channel => (
                  <SelectItem key={channel} value={channel}>{channel}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="w-[250px]">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('name')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Campaign
                    {getSortIcon('name')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('status')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Status
                    {getSortIcon('status')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('channel')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Channel
                    {getSortIcon('channel')}
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('spend')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Spend
                    {getSortIcon('spend')}
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('conversions')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Conversions
                    {getSortIcon('conversions')}
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('cpa')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    CPA
                    {getSortIcon('cpa')}
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('roi')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    ROI
                    {getSortIcon('roi')}
                  </Button>
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedCampaigns.map((campaign) => (
                <TableRow 
                  key={campaign.id}
                  className="hover:bg-muted/30 transition-colors group"
                >
                  <TableCell>
                    <div>
                      <div className="font-medium text-sm">{campaign.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {campaign.impressions.toLocaleString()} impressions • {campaign.clicks.toLocaleString()} clicks
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={getStatusColor(campaign.status)}
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={getChannelColor(campaign.channel)}
                    >
                      {campaign.channel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="font-medium">${campaign.spend.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">
                      CTR: {campaign.ctr.toFixed(2)}%
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {campaign.conversions.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${campaign.cpa.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className={`font-medium ${
                      campaign.roi >= 3 ? 'text-green-600' : 
                      campaign.roi >= 2 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {campaign.roi.toFixed(1)}x
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Campaign
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {campaign.status === 'active' ? (
                            <>
                              <Pause className="w-4 h-4 mr-2" />
                              <span onClick={() => onCampaignAction(campaign.id, 'pause')}>
                                Pause Campaign
                              </span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              <span onClick={() => onCampaignAction(campaign.id, 'resume')}>
                                Resume Campaign
                              </span>
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredAndSortedCampaigns.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-lg font-medium">No campaigns found</p>
            <p className="text-muted-foreground text-sm mt-1">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}