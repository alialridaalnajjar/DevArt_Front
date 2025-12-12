export enum RoleType {
  USER = "student",
  ADMIN = "admin",
  DEVELOPER = "developer",
}
export type UserRole = {
  username: string;
  email: string;
  password: string;
  role: RoleType;
  created_at: Date;
  profile_photo_url?: string | null;
  DOB?: Date | null;
  location?: string | null;
  first_name: string;
  last_name: string;
};

export type ProfileData = {
  username: string;
  email: string;
  password: string;
  role: RoleType;
  created_at: Date;
  profile_photo_url?: string | null;
  dob: Date;
  location?: string | null;
  first_name: string;
  last_name: string;
  bio?: string | null;
};

export interface DecodedToken {
  userId: number;
  username: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export type Activity = {
  title: string;
  user_id: number;
  dod: Date;
};

export type Video = {
  video_id: number;
  module_id: number;
  title: string;
  video_url: string;
  manifest_url?: string | null;
  duration_seconds: number;
  description: string;
  genre: string;
  author?: string;
  language?: string;
};

export type Documentation = {
  doc_id: number;
  video_fk: number;
  title: string;
  content: string;
  course_id: number;
};