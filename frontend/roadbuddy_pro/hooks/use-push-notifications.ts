"use client"

import { savePushSubscription } from "@/services/push-service"
import { urlBase64ToUint8Array } from "@/lib/push"

export function usePushNotifications() {
  const enableNotifications = async () => {
    try {
      if (!("serviceWorker" in navigator)) {
        throw new Error("Service worker not supported")
      }

      if (!("PushManager" in window)) {
        throw new Error("Push not supported")
      }

      // 1. Ask permission
      const permission = await Notification.requestPermission()

      if (permission !== "granted") {
        throw new Error("Permission denied")
      }

      // 2. Wait for service worker
      const registration = await navigator.serviceWorker.ready

      // 3. Check existing subscription
      let subscription = await registration.pushManager.getSubscription()

      if (!subscription) {
        const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!

        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidKey),
        })
      }

      // 4. Send to backend
      const subJson = subscription.toJSON()

      await savePushSubscription({
        endpoint: subJson.endpoint!,
        keys: {
          p256dh: subJson.keys!.p256dh!,
          auth: subJson.keys!.auth!,
        },
      })

      return true
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return { enableNotifications }
}