export enum RoleType {
  USER = "student",
  ADMIN = "admin",
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