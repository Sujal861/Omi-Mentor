
import React from 'react';
import { Bell, Check, X } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotifications, Notification } from '@/hooks/useNotifications';
import { cn } from '@/lib/utils';
import { format, isToday, isYesterday } from 'date-fns';

export function NotificationsPopover() {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead 
  } = useNotifications();

  // Group notifications by date
  const groupedNotifications = notifications.reduce((groups, notification) => {
    const date = new Date(notification.created_at);
    let dateLabel = format(date, 'MMMM d, yyyy');
    
    if (isToday(date)) {
      dateLabel = 'Today';
    } else if (isYesterday(date)) {
      dateLabel = 'Yesterday';
    }
    
    if (!groups[dateLabel]) {
      groups[dateLabel] = [];
    }
    
    groups[dateLabel].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);

  // Get notification icon based on type
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'reminder':
        return <div className="w-2 h-2 rounded-full bg-blue-500"></div>;
      case 'alert':
        return <div className="w-2 h-2 rounded-full bg-red-500"></div>;
      case 'update':
        return <div className="w-2 h-2 rounded-full bg-green-500"></div>;
      case 'achievement':
        return <div className="w-2 h-2 rounded-full bg-purple-500"></div>;
      default:
        return <div className="w-2 h-2 rounded-full bg-gray-500"></div>;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        align="end" 
        className="w-[380px] p-0" 
        sideOffset={16}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-medium tracking-tight">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="h-auto text-xs px-2 py-1"
            >
              <Check className="mr-1 h-3 w-3" />
              Mark all as read
            </Button>
          )}
        </div>
        
        {notifications.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-center">
            <div className="space-y-2">
              <Bell className="mx-auto h-6 w-6 text-gray-400" />
              <h3 className="text-sm font-medium">No notifications</h3>
              <p className="text-xs text-gray-500">
                You're all caught up!
              </p>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="space-y-4 p-4">
              {Object.entries(groupedNotifications).map(([date, items]) => (
                <div key={date} className="space-y-2">
                  <h4 className="text-xs font-medium text-gray-500">{date}</h4>
                  <div className="space-y-2">
                    {items.map((notification) => (
                      <div 
                        key={notification.id}
                        className={cn(
                          "relative pl-6 pr-2 py-2 rounded-lg transition-colors",
                          !notification.read ? "bg-gray-100 dark:bg-gray-800" : "hover:bg-gray-50 dark:hover:bg-gray-900"
                        )}
                      >
                        <div className="absolute left-2 top-3">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-start justify-between">
                            <h5 className="font-medium text-sm">{notification.title}</h5>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 -mr-1 text-gray-400 hover:text-gray-600"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Dismiss</span>
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400">
                            {format(new Date(notification.created_at), 'h:mm a')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  );
}
