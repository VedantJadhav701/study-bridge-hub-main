
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  department?: string;
  semester?: number;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (provider: "google" | "github") => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("study-hub-user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("study-hub-user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (provider: "google" | "github") => {
    setIsLoading(true);
    
    try {
      // Simulate OAuth authentication flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock user data based on provider
      const mockUser: User = {
        id: `user-${Date.now()}`,
        name: provider === "google" ? "John Doe" : "Jane Smith",
        email: provider === "google" ? "john.doe@iiti.ac.in" : "jane.smith@iiti.ac.in",
        avatar: `https://ui-avatars.com/api/?name=${provider === "google" ? "John+Doe" : "Jane+Smith"}&background=random`,
        department: "Computer Science",
        semester: 5
      };
      
      setUser(mockUser);
      localStorage.setItem("study-hub-user", JSON.stringify(mockUser));
      
      toast({
        title: "Logged in successfully",
        description: `Welcome, ${mockUser.name}!`,
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Could not authenticate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("study-hub-user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <UserContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};