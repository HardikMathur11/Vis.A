import { createContext, useState } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [expanded, setexpanded] = useState(false);

  return (
    <SidebarContext.Provider value={{ expanded, setexpanded }}>
      {children}
    </SidebarContext.Provider>
  );
};
