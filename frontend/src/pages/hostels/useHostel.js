import { useQuery } from "@tanstack/react-query";
import { getHotels } from "../../services/apiUser";

function useHostel() {
  const {
    isPending: isLoading,
    data: hotels,
    error,
  } = useQuery({
    queryKey: ["hotels"],
    queryFn: getHotels,
  });
  return { isLoading, hotels, error };
}

export default useHostel;
