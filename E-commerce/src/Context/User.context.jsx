import { createContext, useState } from "react";

export const userContext = createContext("");

export default function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  function LogOut() {
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <userContext.Provider value={{ token, setToken, LogOut }}>
      {children}
    </userContext.Provider>
  );
}
