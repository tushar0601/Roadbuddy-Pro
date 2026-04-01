import { api } from "@/lib/api";
import {
  RegisterVehiclePayload,
  RegisterVehicleResponse,
  Vehicle,
} from "@/types/vehicle";

export async function fetchVehicles(): Promise<Vehicle[]> {
  console.log("CALLING THE API")
  const response = await api.get<Vehicle[]>("/vehicle");
  return response.data;
}

export async function registerVehicle(
  payload: RegisterVehiclePayload,
): Promise<RegisterVehicleResponse> {
  const response = await api.post<RegisterVehicleResponse>(
    "/vehicle/register",
    payload,
  );
  return response.data;
}