import { api } from "@/lib/api"

export type PushSubscriptionPayload = {
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
}

export async function savePushSubscription(payload: PushSubscriptionPayload) {
  const res = await api.post("/push-subscriptions", payload)
  return res.data
}