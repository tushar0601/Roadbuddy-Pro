import { publicApi } from "@/lib/public-api";
import { PingCreateRequest, PingCreateResponse } from "@/types/ping";
import { PublicStickerResponse } from "@/types/sticker";

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

export async function fetchPublicSticker(
  publicCode: string,
): Promise<PublicStickerResponse> {
  const res = await publicApi.get(`/ping/${publicCode}`);
  return res.data;
}