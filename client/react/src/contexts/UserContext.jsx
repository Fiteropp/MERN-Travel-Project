import { createContext, useState, useEffect, useContext } from "react";
import dayjs from 'dayjs';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user from localStorage on initial load (if any)
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [expdate, setexpdate] = useState(() => {
    const expDate = localStorage.getItem("exp-timestamp");
    return expDate ? JSON.parse(expDate) : null;
  })

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/auth/getuserdata`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        console.warn("Unauthorized access");
        return null;
      }


      const data = await response.json();
      setUser(data);
      setexpdate(JSON.stringify(dayjs().add(1, "hour")))
      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("exp-timestamp", JSON.stringify(dayjs().add(1, "hour")))
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  //check cred. expiration timer
  useEffect(() => {
    let reload = 1; // Check credentials again in minutes
    const autoRefresh = setInterval(() => {
        checkCredentialsExpiration();
    }, reload * 60 * 1000); // Convert minutes to milliseconds

    return () => {
        clearInterval(autoRefresh); 
    };
}, []); 


  const checkCredentialsExpiration = () => {
    if (expdate >= dayjs()){
      setUser(null);
      localStorage.removeItem("user")
      localStorage.removeItem("exp-timestamp")
    }
  }

  useEffect(() => {
    if (!user) {
      fetchUserData(); // Fetch user data only if not already in state
    } else {
      setLoading(false); // If user data is already in state, skip fetching
    }
  }, [user]); // Only fetch if `user` is null

  return (
    <UserContext.Provider value={{ user, setUser, loading, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easier usage
export const useUser = () => useContext(UserContext);

