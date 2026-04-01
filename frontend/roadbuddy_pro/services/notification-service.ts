import { api } from "@/lib/api";
import { MarkReadResponse, Notification } from "@/types/notification";

export async function fetchNotifications(): Promise<Notification[]> {
  const response = await api.get<Notification[]>("/notifications");
  return response.data;
}

export async function markNotificationAsRead(
  notificationId: string,
): Promise<MarkReadResponse> {
  const response = await api.post<MarkReadResponse>(
    `/notifications/${notificationId}/read`,
  );
  return response.data;
}