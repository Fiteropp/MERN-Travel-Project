import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user from localStorage on initial load (if any)
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/auth/getuserdata`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unauthorized");
      }

      const data = await response.json();
      setUser(data);
      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

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

