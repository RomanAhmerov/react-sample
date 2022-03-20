import AppRouter from "components/AppRouter";
import Navbar from "components/UI/navbar/Navbar";
import { AuthContext } from "context";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import "./styles/App.css";

function App() {
  // State
  // Статус авторизации в приложении
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Hooks
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }

    setIsLoading(false);
  }, []);

  return (
    // Context
    <AuthContext.Provider
      value={{
        isAuth,
        isLoading,
        setIsAuth,
      }}
    >
      <BrowserRouter>
        <Navbar />

        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
