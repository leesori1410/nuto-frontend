import { useState } from "react";
import { useIsLogin } from "../../context/LoginContext";
import api from "../../api/axios";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLogin } = useIsLogin();

  const handleLogin = async () => {
    try {
      const response = await api.post(`/check/login`, {
        id: id,
        pw: password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token); // JWT 저장
        alert("로그인 성공");
        setIsLogin(true);
        window.location.href = "/check-message";
      }
    } catch (err) {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div>
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="ID"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="PW"
        type="password"
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default Login;
