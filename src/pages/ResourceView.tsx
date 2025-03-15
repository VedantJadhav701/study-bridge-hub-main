
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useResources } from "@/contexts/ResourcesContext";
import { useUser } from "@/contexts/UserContext";
import { Download, Eye, Star, MessageSquare, Share2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import AuthModal from "@/components/AuthModal";

const ResourceView = () => {
  const { resourceId } = useParams();
  const { resources } = useResources();
  const { user } = useUser();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState<"download" | "upload" | "rate" | "general">("general");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  const resource = resources.find(r => r.id === resourceId);

  if (!resource) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-4 md:px-6 container mx-auto">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-800">Resource Not Found</h1>
            <p className="mt-2 text-gray-600">The resource you're looking for doesn't exist or has been removed.</p>
            <Button 
              onClick={() => navigate("/browse")} 
              className="mt-6 bg-blue-600 hover:bg-blue-700"
            >
              Browse Resources
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const handleDownload = () => {
    if (!user) {
      setAuthAction("download");
      setShowAuthModal(true);
      return;
    }
    
    toast({
      title: "Download started",
      description: "Your resource is being downloaded.",
    });
  };

  const handleRating = (value: number) => {
    if (!user) {
      setAuthAction("rate");
      setShowAuthModal(true);
      return;
    }
    
    setRating(value);
    toast({
      title: "Thank you for rating!",
      description: `You rated this resource ${value} stars.`,
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setAuthAction("rate");
      setShowAuthModal(true);
      return;
    }
    
    if (comment.trim()) {
      // Here you would normally save the comment
      toast({
        title: "Comment posted",
        description: "Your comment has been posted successfully.",
      });
      setComment("");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const mockComments = [
    {
      id: "c1",
      userName: "Rajat Kumar",
      userAvatar: "https://ui-avatars.com/api/?name=Rajat+Kumar&background=random",
      content: "This resource was very helpful for my semester preparation. The notes are concise and well-organized.",
      createdAt: "2023-11-15T12:30:00Z",
      rating: 5
    },
    {
      id: "c2",
      userName: "Anika Singh",
      userAvatar: "https://ui-avatars.com/api/?name=Anika+Singh&background=random",
      content: "Good content, but some sections could be more detailed. Helped me understand the basics though.",
      createdAt: "2023-11-10T08:15:00Z",
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{resource.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {resource.subject}
                </Badge>
                <Badge variant="outline" className="bg-amber-50 text-amber-700">
                  Semester {resource.semester}
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 uppercase">
                  {resource.fileType}
                </Badge>
              </div>
              
              <p className="text-gray-700 mb-4">{resource.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {resource.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-t pt-4">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500 mr-4">{resource.viewCount} views</span>
                  <Download className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">{resource.downloadCount} downloads</span>
                </div>
                
                <Button 
                  onClick={handleDownload} 
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resource
                </Button>
              </div>
            </div>
            
            {/* Rating and comments section */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-6">Ratings & Reviews</h2>
              
              <div className="flex items-center gap-1 mb-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TooltipProvider key={star}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => handleRating(star)}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= (hoveredStar || rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Rate {star} star{star !== 1 ? "s" : ""}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">Click to rate</span>
              </div>
              
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <Textarea
                  placeholder="Write your comment or review..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mb-3 resize-none"
                  rows={3}
                />
                <Button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!comment.trim()}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Post Comment
                </Button>
              </form>
              
              <div className="space-y-6">
                {mockComments.map((comment) => (
                  <div key={comment.id} className="border-t pt-4">
                    <div className="flex items-start">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                        <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{comment.userName}</h4>
                          <span className="text-xs text-gray-500">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        <div className="flex mt-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= comment.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Resource Information</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Uploaded by</span>
                  <span className="font-medium">{resource.uploaderName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Upload date</span>
                  <span className="font-medium">{formatDate(resource.uploadDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">File type</span>
                  <span className="font-medium uppercase">{resource.fileType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subject</span>
                  <span className="font-medium">{resource.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Semester</span>
                  <span className="font-medium">{resource.semester}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    // Here you would normally handle sharing
                    navigator.clipboard.writeText(window.location.href);
                    toast({
                      title: "Link copied",
                      description: "Resource link copied to clipboard!",
                    });
                  }}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Resource
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Related Resources</h2>
              
              <div className="space-y-4">
                {resources
                  .filter(r => r.subjectId === resource.subjectId && r.id !== resource.id)
                  .slice(0, 3)
                  .map(item => (
                    <div 
                      key={item.id} 
                      className="flex items-start space-x-3 pb-3 border-b last:border-0 last:pb-0"
                    >
                      <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                        {item.fileType === "pdf" && <span className="text-red-500 text-xs font-bold">PDF</span>}
                        {item.fileType === "doc" && <span className="text-blue-500 text-xs font-bold">DOC</span>}
                        {item.fileType === "ppt" && <span className="text-orange-500 text-xs font-bold">PPT</span>}
                        {item.fileType === "image" && <span className="text-green-500 text-xs font-bold">IMG</span>}
                        {item.fileType === "video" && <span className="text-purple-500 text-xs font-bold">VID</span>}
                        {item.fileType === "other" && <span className="text-gray-500 text-xs font-bold">FILE</span>}
                      </div>
                      <div>
                        <h3 
                          className="font-medium text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                          onClick={() => navigate(`/resource/${item.id}`)}
                        >
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">Semester {item.semester}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        actionType={authAction}
      />
    </div>
  );
};

export default ResourceView;
