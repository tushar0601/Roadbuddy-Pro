export type PingCreateRequest = {
  reason?: string | null;
  note?: string | null;
};

export type PingCreateResponse = {
  ping_event_id: string;
  message: string;
  created_at: string;
};