/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { formatDistanceToNow } from "date-fns";
import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/common/empty-state";
import { LoadingState } from "@/components/common/loading-state";
import { useNotifications } from "@/hooks/use-notifications";
import { toast } from "sonner";

export function NotificationsList() {
  const { notifications, isLoading, markAsRead } = useNotifications();

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const handleMarkRead = async (notificationId: string) => {
    try {
      await markAsRead(notificationId);
      toast.success("Notification marked as read");
    } catch (error: any) {
      const message =
        error?.response?.data?.detail || "Unable to mark notification as read";
      toast.error(message);
    }
  };

  return (
    <Card className="rounded-3xl border border-slate-800 bg-slate-950/90 shadow-xl">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-xl text-slate-100">
            <Bell className="h-5 w-5 text-amber-400" />
            Notifications
          </CardTitle>
          <p className="mt-1 text-sm text-slate-400">
            Stay updated when someone pings your vehicle.
          </p>
        </div>

        <div className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300">
          {unreadCount} unread
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <LoadingState text="Loading notifications..." />
        ) : notifications.length === 0 ? (
          <EmptyState
            title="No notifications yet"
            description="When someone pings your vehicle, notifications will show up here."
          />
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`group rounded-2xl border p-4 transition-all duration-200 ${
                  notification.is_read
                    ? "border-slate-800 bg-slate-900/60 opacity-75"
                    : "border-amber-500/20 bg-slate-900 shadow-md"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 gap-3">
                    <div
                      className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                        notification.is_read ? "bg-slate-600" : "bg-amber-400"
                      }`}
                    />

                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="truncate text-sm font-semibold text-slate-100">
                          {notification.title}
                        </h4>
                        {!notification.is_read && (
                          <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300">
                            New
                          </span>
                        )}
                      </div>

                      {notification.body ? (
                        <p className="text-sm leading-6 text-slate-400">
                          {notification.body}
                        </p>
                      ) : null}

                      <p className="text-xs text-slate-500">
                        {formatDistanceToNow(
                          new Date(notification.created_at),
                          {
                            addSuffix: true,
                          },
                        )}
                      </p>
                    </div>
                  </div>

                  {!notification.is_read ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkRead(notification.id)}
                      className="shrink-0 rounded-xl border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
                    >
                      <CheckCheck className="mr-2 h-4 w-4" />
                      Mark read
                    </Button>
                  ) : (
                    <div className="shrink-0 rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-slate-400">
                      Read
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
