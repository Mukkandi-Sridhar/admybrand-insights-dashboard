'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, X, Check, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

interface NotificationCenterProps {
  notifications: Notification[];
}

export function NotificationCenter({ notifications: initialNotifications }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const getNotificationIcon = (type: string) => {
    const icons = {
      info: Info,
      success: CheckCircle,
      warning: AlertTriangle,
      error: AlertTriangle
    };
    return icons[type as keyof typeof icons] || Info;
  };

  const getNotificationColor = (type: string) => {
    const colors = {
      info: 'from-blue-500 to-blue-600',
      success: 'from-green-500 to-green-600',
      warning: 'from-yellow-500 to-yellow-600',
      error: 'from-red-500 to-red-600'
    };
    return colors[type as keyof typeof colors] || colors.info;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="border-0 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              Mark all read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <AnimatePresence>
            <div className="space-y-3">
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`relative p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                      notification.read 
                        ? 'bg-muted/30 border-border/50' 
                        : 'bg-card border-border shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${getNotificationColor(notification.type)} flex-shrink-0`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={`font-medium text-sm leading-tight ${
                            notification.read ? 'text-muted-foreground' : 'text-foreground'
                          }`}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-6 w-6 p-0 hover:bg-muted"
                              >
                                <Check className="w-3 h-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => dismissNotification(notification.id)}
                              className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className={`text-xs mt-1 leading-relaxed ${
                          notification.read ? 'text-muted-foreground/70' : 'text-muted-foreground'
                        }`}>
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground/60">
                            {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                          </span>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
          
          {notifications.length === 0 && (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">No notifications</p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                You're all caught up!
              </p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}