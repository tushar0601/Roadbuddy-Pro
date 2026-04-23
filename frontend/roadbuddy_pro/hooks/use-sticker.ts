"use client";

import { useMutation } from "@tanstack/react-query";
import { createSticker } from "@/services/sticker-service";

export function useSticker() {
  const mutation = useMutation({
    mutationFn: createSticker,
  });

  return {
    createSticker: mutation.mutateAsync,
    createStickerPending: mutation.isPending,
    createdSticker: mutation.data,
  };
}