import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addBooking } from "../../services/apiUser";

function useCreateBooking() {
  const queryClient = useQueryClient();

  const { mutate: booking, isLoading: isCreating } = useMutation({
    mutationFn: addBooking,
    onSuccess: () => {
      toast.success("A booking is done");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, booking };
}

export default useCreateBooking;
