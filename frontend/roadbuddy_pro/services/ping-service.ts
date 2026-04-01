import { publicApi } from "@/lib/public-api";
import { PingCreateRequest, PingCreateResponse } from "@/types/ping";

export async function createPing(
  publicCode: string,
  payload: PingCreateRequest,
): Promise<PingCreateResponse> {
  const response = await publicApi.post<PingCreateResponse>(
    `/ping/${publicCode}`,
    payload,
  );

  return response.data;
}