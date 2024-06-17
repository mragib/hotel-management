import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) return;

    const userData = [
      { id: 1, username: "ragib", password: "123456" },
      { id: 2, username: "test", password: "1234567" },
      { id: 3, username: "test1", password: "12345678" },
    ];

    const found = userData.find((item) => item.username === username);

    if (!found || found.password !== password) {
      toast.error("Invalid credentials");
      navigate("/login", { replace: true });
      setPassword("");
      return;
    }

    dispatch(login(found));
  }
  return (
    <form onSubmit={handleSubmit} style={{ border: "none" }}>
      <input
        type="text"
        id="email"
        // This makes this form better for password managers
        autoComplete="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button> Log in </button>
      {/* <Button size="large" disabled={isLoading}>
        {isLoading ? <SpinnerMini /> : "Log in"}
      </Button> */}
    </form>
  );
}
