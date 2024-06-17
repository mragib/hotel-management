import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiUser";

function useBookings(id) {
  const {
    isPending: isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => getBookings(id),
  });
  return { isLoading, bookings, error };
}

export default useBookings;
