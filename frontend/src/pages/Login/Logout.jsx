import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

function Logout() {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(logout())}>
      <HiArrowRightOnRectangle />
    </button>
  );
}

export default Logout;
