"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchVehicles, registerVehicle } from "@/services/vehicle-service";
import { RegisterVehiclePayload } from "@/types/vehicle";

export function useVehicles() {
  console.log("useVehicles hook called");
  const queryClient = useQueryClient();

  const vehiclesQuery = useQuery({
    queryKey: ["vehicles"],
    queryFn: fetchVehicles,
  });
  
  const registerVehicleMutation = useMutation({
    mutationFn: (payload: RegisterVehiclePayload) => registerVehicle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });

  return {
    vehicles: vehiclesQuery.data ?? [],
    isLoading: vehiclesQuery.isLoading,
    error: vehiclesQuery.error,
    registerVehicle: registerVehicleMutation.mutateAsync,
    registerVehiclePending: registerVehicleMutation.isPending,
  };
}