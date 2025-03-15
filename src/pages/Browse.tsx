
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ResourceGrid from "@/components/ResourceGrid";
import SearchFilterComponent from "@/components/SearchFilters";
import { Resource, SearchFilters } from "@/utils/types";
import { useResources } from "@/contexts/ResourcesContext";

const Browse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resources } = useResources();
  const [filteredResources, setFilteredResources] = useState<Resource[]>(resources);
  const [activeFilters, setActiveFilters] = useState<SearchFilters>({
    query: "",
    sortBy: "recent",
  });

  // Parse query parameters on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParams: Partial<SearchFilters> = {};

    if (params.has("query")) queryParams.query = params.get("query") || "";
    if (params.has("semester")) queryParams.semester = parseInt(params.get("semester") || "0");
    if (params.has("subject")) queryParams.subject = params.get("subject") || "";
    if (params.has("fileType")) queryParams.fileType = params.get("fileType") as any;
    if (params.has("tags")) queryParams.tags = params.get("tags")?.split(",");
    if (params.has("sortBy")) queryParams.sortBy = params.get("sortBy") as any || "recent";

    const initialFilters = {
      ...activeFilters,
      ...queryParams,
    };

    setActiveFilters(initialFilters as SearchFilters);
    applyFilters(initialFilters as SearchFilters, resources);
  }, [location.search, resources]);

  const applyFilters = (filters: SearchFilters, resourcesList: Resource[]) => {
    let filtered = [...resourcesList];

    // Filter by search query
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query) ||
          resource.subject.toLowerCase().includes(query) ||
          resource.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by semester
    if (filters.semester) {
      filtered = filtered.filter(
        (resource) => resource.semester === filters.semester
      );
    }

    // Filter by subject
    if (filters.subject) {
      filtered = filtered.filter(
        (resource) => resource.subjectId === filters.subject
      );
    }

    // Filter by file type
    if (filters.fileType) {
      filtered = filtered.filter(
        (resource) => resource.fileType === filters.fileType
      );
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter((resource) =>
        filters.tags!.some((tag) => resource.tags.includes(tag))
      );
    }

    // Sort resources
    switch (filters.sortBy) {
      case "recent":
        filtered.sort(
          (a, b) =>
            new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
        );
        break;
      case "popular":
        filtered.sort((a, b) => b.downloadCount - a.downloadCount);
        break;
      case "topRated":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredResources(filtered);

    // Update URL with filters
    const urlParams = new URLSearchParams();
    if (filters.query) urlParams.set("query", filters.query);
    if (filters.semester) urlParams.set("semester", filters.semester.toString());
    if (filters.subject) urlParams.set("subject", filters.subject);
    if (filters.fileType) urlParams.set("fileType", filters.fileType);
    if (filters.tags && filters.tags.length > 0) urlParams.set("tags", filters.tags.join(","));
    if (filters.sortBy) urlParams.set("sortBy", filters.sortBy);

    navigate({
      pathname: location.pathname,
      search: urlParams.toString(),
    }, { replace: true });
  };

  const handleFilterChange = (filters: SearchFilters) => {
    setActiveFilters(filters);
    applyFilters(filters, resources);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Resources</h1>
            <p className="text-gray-600 max-w-3xl">
              Explore study materials uploaded by IIT Indore students. Use the filters to find exactly what you need.
            </p>
          </div>

          <SearchFilterComponent onFilter={handleFilterChange} />

          <ResourceGrid 
            resources={filteredResources}
            description={
              filteredResources.length === 0
                ? "No resources match your current filters. Try adjusting your search criteria."
                : `Showing ${filteredResources.length} resources`
            }
          />
        </div>
      </main>

      <footer className="bg-gray-50 border-t py-8">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} IIT Indore Study Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Browse;
