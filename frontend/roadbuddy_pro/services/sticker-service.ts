import { api } from "@/lib/api";
import { StickerCreateResponse } from "@/types/sticker";

export async function createSticker(): Promise<StickerCreateResponse> {
  const response = await api.post<StickerCreateResponse>("/sticker/create");
  return response.data;
}