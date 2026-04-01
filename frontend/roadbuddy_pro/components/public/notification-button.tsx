"use client"

import { Button } from "@/components/ui/button"
import { usePushNotifications } from "@/hooks/use-push-notifications"
import { toast } from "sonner"

export function EnableNotificationsButton() {
  const { enableNotifications } = usePushNotifications()

  const handleClick = async () => {
    try {
      await enableNotifications()
      toast.success("Notifications enabled 🔔")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error(e.message || "Failed to enable notifications")
    }
  }

  return (
    <Button onClick={handleClick}>
      Enable Notifications
    </Button>
  )
}