import { useContext } from "react";

import { AuthContext } from "../context/AuthContextProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth phải được sử dụng trong AuthProvider");
  }
  return context;
};
