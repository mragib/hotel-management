import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiUser";

function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: loginApi,

    onSuccess: () => {
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Invalid credentials");
    },
  });

  return { login, isLoading };
}

export default useLogin;
