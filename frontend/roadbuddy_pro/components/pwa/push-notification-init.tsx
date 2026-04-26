"use client"

import { useEffect } from "react"
import { getToken } from "@/lib/auth"
import { urlBase64ToUint8Array } from "@/lib/push"
import { savePushSubscription } from "@/services/push-service"

export function PushNotificationInit() {
  useEffect(() => {
    async function refreshSubscription() {
      // Only run if user is logged in and browser supports push
      if (!getToken()) return
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) return
      if (!("Notification" in window)) return
      if (Notification.permission !== "granted") return

      const registration = await navigator.serviceWorker.ready
      let subscription = await registration.pushManager.getSubscription()

      // Re-subscribe if no subscription exists (e.g. browser cleared it)
      if (!subscription) {
        const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY

        if (!vapidKey) return

        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidKey),
        })
      }

      // Always sync the current endpoint to the backend —
      // Chrome can silently rotate the endpoint without telling you.
      const sub = subscription.toJSON()
      await savePushSubscription({
        endpoint: sub.endpoint!,
        keys: {
          p256dh: sub.keys!.p256dh!,
          auth: sub.keys!.auth!,
        },
      })
    }

    refreshSubscription().catch(console.error)
  }, [])

  return null
}
