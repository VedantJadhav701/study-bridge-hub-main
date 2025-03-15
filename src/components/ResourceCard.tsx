
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileIcon, Download, Star, Eye } from "lucide-react";
import { Resource, FileType } from "@/utils/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ResourceCardProps {
  resource: Resource;
  className?: string;
}

const ResourceCard = ({ resource, className }: ResourceCardProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const getFileTypeIcon = (fileType: FileType) => {
    switch (fileType) {
      case FileType.PDF:
        return <FileIcon className="h-5 w-5 text-red-500" />;
      case FileType.DOC:
        return <FileIcon className="h-5 w-5 text-blue-500" />;
      case FileType.PPT:
        return <FileIcon className="h-5 w-5 text-orange-500" />;
      case FileType.IMAGE:
        return <FileIcon className="h-5 w-5 text-green-500" />;
      case FileType.VIDEO:
        return <FileIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <FileIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Add a special style for the "Current User" uploader
  const isCurrentUser = resource.uploaderName === "Current User";

  return (
    <Link to={`/resource/${resource.id}`}>
      <Card 
        className={cn(
          "overflow-hidden h-full card-hover transition-all",
          className
        )}
      >
        <div className="relative pt-[56.25%] bg-gray-100 overflow-hidden">
          {resource.thumbnailUrl ? (
            <>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="h-8 w-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                </div>
              )}
              <img
                src={resource.thumbnailUrl}
                alt={resource.title}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                  isLoading ? "opacity-0" : "opacity-100"
                )}
                onLoad={() => setIsLoading(false)}
              />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              {getFileTypeIcon(resource.fileType)}
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge 
              variant="secondary" 
              className="bg-white/80 backdrop-blur-sm text-xs font-medium"
            >
              {getFileTypeIcon(resource.fileType)}
              <span className="ml-1">{resource.fileType.toUpperCase()}</span>
            </Badge>
          </div>
          {isCurrentUser && (
            <div className="absolute top-3 right-3">
              <Badge 
                variant="secondary" 
                className="bg-blue-500 text-white text-xs font-medium"
              >
                Your Upload
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Badge 
              variant="outline" 
              className="bg-blue-50 text-blue-700 border-blue-100 text-xs"
            >
              {resource.subject}
            </Badge>
            <Badge 
              variant="outline" 
              className="bg-gray-50 text-gray-700 border-gray-100 text-xs"
            >
              Sem {resource.semester}
            </Badge>
          </div>

          <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
            {resource.title}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {resource.description}
          </p>

          <div className="flex flex-wrap gap-1 mt-2">
            {resource.tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                {tag}
              </Badge>
            ))}
            {resource.tags.length > 3 && (
              <Badge 
                variant="secondary" 
                className="text-xs bg-gray-100 text-gray-700"
              >
                +{resource.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center">
            <p className={isCurrentUser ? "font-medium text-blue-600" : ""}>
              By {resource.uploaderName}
            </p>
            <span className="mx-2">•</span>
            <p>{formatDate(resource.uploadDate)}</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 text-amber-500 mr-1" />
              <span>{resource.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center">
              <Download className="h-3.5 w-3.5 text-gray-400 mr-1" />
              <span>{resource.downloadCount}</span>
            </div>
            <div className="flex items-center">
              <Eye className="h-3.5 w-3.5 text-gray-400 mr-1" />
              <span>{resource.viewCount}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ResourceCard;
