
export interface Resource {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  subject: string;
  semester: number;
  fileType: FileType;
  fileUrl: string;
  thumbnailUrl?: string;
  tags: string[];
  uploadDate: string;
  uploaderId: string;
  uploaderName: string;
  rating: number;
  downloadCount: number;
  viewCount: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  semester: number;
  department: string;
  resourceCount: number;
}

export enum FileType {
  PDF = "pdf",
  DOC = "doc",
  PPT = "ppt",
  IMAGE = "image",
  VIDEO = "video",
  OTHER = "other"
}

export interface Department {
  id: string;
  name: string;
  code: string;
}

export interface Semester {
  id: number;
  name: string;
  subjects: Subject[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  semester: number;
  avatar?: string;
  uploadedResources: number;
  downloadedResources: number;
}

export interface Comment {
  id: string;
  resourceId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  rating?: number;
}

export interface SearchFilters {
  query: string;
  semester?: number;
  subject?: string;
  fileType?: FileType;
  tags?: string[];
  sortBy: "recent" | "popular" | "topRated";
}
