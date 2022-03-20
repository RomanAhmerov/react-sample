// @ts-nocheck
import MyButton from "components/UI/button/MyButton";
import MyInput from "components/UI/input/MyInput";
import { AuthContext } from "context";
import React, { useContext } from "react";

const Login = () => {
  const { setIsAuth } = useContext(AuthContext);

  // Funtional (local BLL)
  const login = (event) => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true');
  };

  return (
    <div>
      <h1>Страница для логина</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Введите логин" />
        <MyInput type="password" placeholder="Введите пароль" />
        <MyButton>Войти</MyButton>
      </form>
    </div>
  );
};

export default Login;
