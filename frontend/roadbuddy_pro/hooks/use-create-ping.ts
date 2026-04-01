"use client";

import { useMutation } from "@tanstack/react-query";
import { createPing } from "@/services/ping-service";
import { PingCreateRequest, PingCreateResponse } from "@/types/ping";

export function useCreatePing(publicCode: string) {
  const mutation = useMutation<PingCreateResponse, Error, PingCreateRequest>({
    mutationFn: (payload) => createPing(publicCode, payload),
  });

  return {
    createPing: mutation.mutateAsync,
    createPingPending: mutation.isPending,
    createPingSuccess: mutation.isSuccess,
    createPingError: mutation.isError,
    createPingResponse: mutation.data,
    resetCreatePing: mutation.reset,
  };
}