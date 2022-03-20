import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "router";
import Error from "pages/Error";
import { AuthContext } from "context";
import Loader from "./UI/loader/Loader";

const AppRouter = () => {
  // Context
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      {/* Страницы в зависимости от статуса авторизации */}
      {isAuth
        ? privateRoutes.map((route) => (
            <Route
              key={route.path}
              element={route.component}
              path={route.path}
            /> 
          ))
        : publicRoutes.map((route) => (
            <Route
              key={route.path}
              element={route.component}
              path={route.path}
            />
          ))}

      {isAuth ? (
        <Route path="*" element={<Navigate to="/posts" replace />} />
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}

      {/* Общие страницы */}
      <Route path="/error" element={<Error />} />

      {/* Редирект */}
      <Route path="/" element={<Navigate to="/posts" replace />} />
    </Routes>
  );
};

export default AppRouter;
