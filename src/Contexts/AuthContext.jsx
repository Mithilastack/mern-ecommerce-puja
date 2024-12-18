import React, { createContext, useState, useEffect, useContext } from "react";

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user info or null if not logged in
  const [loading, setLoading] = useState(true); // Show a loader while checking authentication
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken")); // Store auth token

  // Check if user is in localStorage on mount or if user or token changes
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAuthToken = localStorage.getItem("authToken");

    console.log("Checking localStorage for user and token:", storedUser, storedAuthToken);

    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser); // Set the parsed user data
        console.log("Parsed user from localStorage:", parsedUser);
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
      }
    }

    // If user and token exist in localStorage, we assume the user is logged in
    if (storedAuthToken && storedUser) {
      setAuthToken(storedAuthToken);
    }

    setLoading(false);
  }, []); // Runs once when component mounts

  // Login function: sets user and token, logs changes
  const login = (userData, token) => {
    if (userData && token) {
      setUser(userData);
      setAuthToken(token);

      localStorage.setItem("user", JSON.stringify(userData)); // Save user info in localStorage
      localStorage.setItem("authToken", token); // Save token in localStorage

      console.log("User logged in:", userData);
      console.log("Auth token saved:", token);
    }
  };

  // Logout function: clears user and token, logs changes
  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");

    console.log("User logged out, state cleared");
  };

  // Log user state changes whenever it updates
  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, authToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("Accessing user from context:", context.user); // Log user every time context is accessed
  return context;
};
