
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, X } from "lucide-react";
import { FileType, SearchFilters } from "@/utils/types";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { popularTags, semesters, subjects } from "@/utils/data";

interface SearchFilterProps {
  onFilter: (filters: SearchFilters) => void;
}

const SearchFilterComponent = ({ onFilter }: SearchFilterProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedFileType, setSelectedFileType] = useState<string>("");
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "topRated">("recent");

  const fileTypes = [
    { label: "PDF", value: FileType.PDF },
    { label: "Document", value: FileType.DOC },
    { label: "Presentation", value: FileType.PPT },
    { label: "Image", value: FileType.IMAGE },
    { label: "Video", value: FileType.VIDEO },
    { label: "Other", value: FileType.OTHER },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedSemester("");
    setSelectedSubject("");
    setSelectedFileType("");
    setSortBy("recent");
    
    onFilter({
      query: searchQuery,
      sortBy: "recent",
    });
  };

  const applyFilters = () => {
    onFilter({
      query: searchQuery,
      semester: selectedSemester ? parseInt(selectedSemester) : undefined,
      subject: selectedSubject || undefined,
      fileType: selectedFileType as FileType || undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      sortBy,
    });
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 mb-8 animate-scale-in">
      <form onSubmit={handleSearchSubmit} className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search for resources..."
              className="pl-10 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>
          <Button onClick={() => setIsFiltersOpen(!isFiltersOpen)} type="button" variant="outline">
            <Filter size={16} className="mr-2" />
            Filters
          </Button>
        </div>

        {isFiltersOpen && (
          <div className="animate-slide-down pt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="semester">Semester</Label>
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger id="semester">
                    <SelectValue placeholder="All Semesters" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Semesters</SelectItem>
                    {semesters.map((semester) => (
                      <SelectItem key={semester.id} value={semester.id.toString()}>
                        {semester.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Subjects</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="fileType">File Type</Label>
                <Select value={selectedFileType} onValueChange={setSelectedFileType}>
                  <SelectTrigger id="fileType">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    {fileTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-4">
              <Label className="mb-2 block">Tags</Label>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={selectedTags.includes(tag) 
                      ? "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 cursor-pointer"
                      : "bg-gray-50 hover:bg-gray-100 cursor-pointer"}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <Label className="mb-2 block">Sort By</Label>
              <Tabs defaultValue={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="topRated">Top Rated</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={clearFilters}
              >
                <X size={16} className="mr-2" />
                Clear Filters
              </Button>
              <Button 
                type="button" 
                onClick={() => {
                  applyFilters();
                  setIsFiltersOpen(false);
                }}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchFilterComponent;
