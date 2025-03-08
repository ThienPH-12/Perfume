import React, { useState } from "react";
import "./Login.scss";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Attempt:", { username, password });
    // Add your authentication logic here
  };

  return (
    <div id="Login" className="d-flex" style={{ marginTop: "50px" }}>
      <div className="container">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            Tên tài khoản hoặc địa chỉ email *:
          </div>
          <div className="input-container">
            <input
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">Mật khẩu *:</div>
          <div className="input-container">
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
