import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // Runs only on initial mount

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easier usage
export const useUser = () => useContext(UserContext);