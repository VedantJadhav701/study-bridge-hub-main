
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileType } from "@/utils/types";
import { FileUp, X, Check, AlertCircle } from "lucide-react";
import { semesters, subjects } from "@/utils/data";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { useResources } from "@/contexts/ResourcesContext";

const UploadForm = () => {
  const navigate = useNavigate();
  const { addResource } = useResources();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [fileType, setFileType] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileTypes = [
    { label: "PDF Document", value: FileType.PDF },
    { label: "Word Document", value: FileType.DOC },
    { label: "Presentation", value: FileType.PPT },
    { label: "Image", value: FileType.IMAGE },
    { label: "Video", value: FileType.VIDEO },
    { label: "Other", value: FileType.OTHER },
  ];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);

      // Auto-detect file type
      const fileName = e.target.files[0].name.toLowerCase();
      if (fileName.endsWith(".pdf")) {
        setFileType(FileType.PDF);
      } else if (fileName.endsWith(".doc") || fileName.endsWith(".docx")) {
        setFileType(FileType.DOC);
      } else if (fileName.endsWith(".ppt") || fileName.endsWith(".pptx")) {
        setFileType(FileType.PPT);
      } else if (
        fileName.endsWith(".jpg") ||
        fileName.endsWith(".jpeg") ||
        fileName.endsWith(".png") ||
        fileName.endsWith(".gif")
      ) {
        setFileType(FileType.IMAGE);
      } else if (
        fileName.endsWith(".mp4") ||
        fileName.endsWith(".avi") ||
        fileName.endsWith(".mov")
      ) {
        setFileType(FileType.VIDEO);
      } else {
        setFileType(FileType.OTHER);
      }
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    // Validate form
    if (!title || !description || !subject || !semester || !fileType || !file) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and upload a file.",
        variant: "destructive",
      });
      setIsUploading(false);
      return;
    }

    try {
      // Simulate upload with timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Get the selected subject details
      const selectedSubject = subjects.find(s => s.id === subject);
      
      if (!selectedSubject) {
        throw new Error("Subject not found");
      }

      // Create a new resource
      addResource({
        title,
        description,
        subjectId: subject,
        subject: selectedSubject.name,
        semester: parseInt(semester),
        fileType: fileType as FileType,
        fileUrl: "#",
        thumbnailUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2128&auto=format&fit=crop",
        tags: tags.length > 0 ? tags : ["new", "upload"],
        uploadDate: new Date().toISOString(),
        uploaderId: "current-user",
        uploaderName: "Current User"
      });

      toast({
        title: "Resource uploaded successfully!",
        description: "Your resource has been uploaded and is now available.",
        variant: "default",
      });

      // Redirect to browse page
      navigate("/browse");
    } catch (error) {
      console.error("Error uploading resource:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your resource. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const filteredSubjects = semester
    ? subjects.filter((s) => s.semester === parseInt(semester))
    : subjects;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-sm font-medium">
              Resource Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Calculus Complete Notes"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe this resource..."
              className="mt-1 resize-none"
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="semester" className="text-sm font-medium">
              Semester <span className="text-red-500">*</span>
            </Label>
            <Select value={semester} onValueChange={setSemester} required>
              <SelectTrigger id="semester" className="mt-1">
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((sem) => (
                  <SelectItem key={sem.id} value={sem.id.toString()}>
                    {sem.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subject" className="text-sm font-medium">
              Subject <span className="text-red-500">*</span>
            </Label>
            <Select value={subject} onValueChange={setSubject} required>
              <SelectTrigger
                id="subject"
                className="mt-1"
                disabled={!semester}
              >
                <SelectValue
                  placeholder={
                    semester ? "Select subject" : "Select semester first"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {filteredSubjects.map((sub) => (
                  <SelectItem key={sub.id} value={sub.id}>
                    {sub.name} ({sub.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="fileType" className="text-sm font-medium">
              File Type <span className="text-red-500">*</span>
            </Label>
            <Select value={fileType} onValueChange={setFileType} required>
              <SelectTrigger id="fileType" className="mt-1">
                <SelectValue placeholder="Select file type" />
              </SelectTrigger>
              <SelectContent>
                {fileTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="tags" className="text-sm font-medium">
              Tags
            </Label>
            <div className="flex mt-1">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Add tags and press Enter"
                className="rounded-r-none"
              />
              <Button
                type="button"
                onClick={handleAddTag}
                variant="secondary"
                className="rounded-l-none"
              >
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-blue-700 hover:text-blue-900"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="file" className="text-sm font-medium">
              Upload File <span className="text-red-500">*</span>
            </Label>
            <div className="mt-1">
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  file
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                } transition-colors`}
              >
                {!file ? (
                  <div className="space-y-2">
                    <FileUp className="mx-auto h-10 w-10 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer text-blue-600 hover:text-blue-700"
                      >
                        <span>Click to upload</span>
                        <Input
                          id="file-upload"
                          type="file"
                          onChange={handleFileChange}
                          className="sr-only"
                          required
                        />
                      </label>{" "}
                      or drag and drop
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, PPT, JPG, PNG, MP4 up to 50MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <Check className="h-6 w-6 text-green-500 mr-2" />
                      <span className="text-green-700 font-medium">
                        File ready to upload
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{file.name}</p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFile(null)}
                      className="text-sm text-gray-500 hover:text-red-500"
                    >
                      <X size={16} className="mr-1" />
                      Remove file
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-amber-700 bg-amber-50 p-4 rounded-lg">
        <AlertCircle size={16} />
        <p className="text-sm">
          By uploading this resource, you confirm that you have the right to share
          this material and that it doesn't violate any copyright laws.
        </p>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isUploading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isUploading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Uploading...
            </>
          ) : (
            <>
              <FileUp size={16} className="mr-2" />
              Upload Resource
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default UploadForm;
