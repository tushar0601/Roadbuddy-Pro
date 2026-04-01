export type Notification = {
  id: string;
  type: string;
  title: string;
  body?: string | null;
  is_read: boolean;
  created_at: string;
  read_at?: string | null;
};

export type MarkReadResponse = {
  id: string;
  is_read: boolean;
  read_at?: string | null;
  message: string;
};