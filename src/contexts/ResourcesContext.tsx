
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Resource, FileType } from "@/utils/types";
import { resources as initialResources } from "@/utils/data";
import { toast } from "@/components/ui/use-toast";

interface ResourcesContextType {
  resources: Resource[];
  addResource: (resource: Omit<Resource, "id" | "rating" | "downloadCount" | "viewCount">) => void;
}

const ResourcesContext = createContext<ResourcesContextType | undefined>(undefined);

export const useResources = () => {
  const context = useContext(ResourcesContext);
  if (!context) {
    throw new Error("useResources must be used within a ResourcesProvider");
  }
  return context;
};

export const ResourcesProvider = ({ children }: { children: ReactNode }) => {
  const [resources, setResources] = useState<Resource[]>(initialResources);

  const addResource = (newResource: Omit<Resource, "id" | "rating" | "downloadCount" | "viewCount">) => {
    // Generate a new unique ID
    const id = `r${resources.length + 1}`;
    
    // Create the complete resource with default values for rating and counts
    const completeResource: Resource = {
      ...newResource,
      id,
      rating: 0,
      downloadCount: 0,
      viewCount: 0
    };
    
    setResources((prevResources) => [completeResource, ...prevResources]);
    toast({
      title: "Resource added",
      description: "Your resource has been added to the browse section",
    });
  };

  return (
    <ResourcesContext.Provider value={{ resources, addResource }}>
      {children}
    </ResourcesContext.Provider>
  );
};

