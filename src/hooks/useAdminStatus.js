import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const useAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwt_decode(token);
  
        
        setIsAdmin(decoded?.role === "SUPERADMIN");
      } else {
        setIsAdmin(false);
      }
    } catch (err) {
      console.error("Invalid token:", err);
      setIsAdmin(false);
    }
  }, []);

  return isAdmin;
};

export default useAdminStatus;
