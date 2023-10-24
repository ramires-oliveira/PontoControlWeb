import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  document?: string;
  email?: string;
  isFirstLogin?: boolean;
  name?: string;
  position?: string;
  token: string;
  typeUser?: number;
}

interface SidebarContextProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}: SidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | undefined>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : undefined;
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const setUserData = (userData: User) => {
    setUser(userData);
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, user, setUser }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextProps => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar deve ser usado dentro de um SidebarProvider");
  }

  return context;
};
