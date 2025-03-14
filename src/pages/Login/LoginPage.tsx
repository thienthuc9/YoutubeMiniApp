import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";
import { AppDispatch } from "../../redux/store";
import { loginUser } from "../../redux/slice/authSlice";

const LoginPage: React.FC = () => {
  const [state, setState] = useImmer({
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const onChange = (type: keyof typeof state, value: string) => {
    setState(draft => {
      draft[type] = value;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resultAction = await dispatch(loginUser({ email: state.email, password: state.password }));
    if (loginUser.fulfilled.match(resultAction)) {
      window.location.href = `${window.location.origin}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <div className="mb-4">
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            value={state.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Mật khẩu</label>
          <input
            type="password"
            value={state.password}
            onChange={(e) => onChange('password', e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
