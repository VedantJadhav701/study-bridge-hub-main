
import { Resource } from "@/utils/types";
import ResourceCard from "./ResourceCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResourceGridProps {
  resources: Resource[];
  title?: string;
  description?: string;
  className?: string;
}

const ResourceGrid = ({ 
  resources, 
  title, 
  description, 
  className 
}: ResourceGridProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`w-full transition-all duration-300 ${className}`}>
      {(title || description) && (
        <div className="mb-6 md:mb-8">
          {title && (
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 animate-fade-in">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm md:text-base text-gray-600 max-w-3xl animate-fade-in animation-delay-300">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 animate-scale-in">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
      
      {resources.length === 0 && (
        <div className="text-center py-8 md:py-12 bg-gray-50 rounded-lg animate-fade-in">
          <p className="text-gray-500">No resources found</p>
          {!isMobile && (
            <p className="text-sm text-gray-400 mt-2">Try adjusting your search filters</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ResourceGrid;
