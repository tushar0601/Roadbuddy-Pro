export type Vehicle = {
  id: string;
  nickname?: string | null;
  plate_last_4?: string | null;
  vehicle_type?: string | null;
  is_active: boolean;
  created_at: string;
};

export type RegisterVehiclePayload = {
  sticker_code: string;
  plate_no: string;
};

export type RegisterVehicleResponse = {
  vehicle_id: string;
  sticker_code: string;
  status: string;
};