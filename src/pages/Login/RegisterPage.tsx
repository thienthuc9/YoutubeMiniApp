import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useImmer } from "use-immer";
import { AppDispatch, RootState } from "../../redux/store";
import { registerUser } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [state, setState] = useImmer({
    email: '',
    password: '',
    username: ''
  })
  const handleSubmit = async  (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(registerUser(state));

    if (registerUser.fulfilled.match(resultAction)) {
      navigate("/login");
    }

  };
  const onChange = (type: keyof typeof state, value: string) => {
    setState(draft => {
      draft[type] = value;
    });
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Đăng ký</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <div className="mb-4">
          <label className="block font-semibold">Tên người dùng</label>
          <input
            type="text"
            value={state.username}
            onChange={(e) => onChange('username', e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
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
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;