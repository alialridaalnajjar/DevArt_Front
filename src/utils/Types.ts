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
  thumbnail: string;
  video_id: number;
  module: string;
  title: string;
  video_url: string;
  manifest_url?: string | null;
  duration_seconds: number;
  description: string;
  genre: string;
  author?: string;
  language?: string;
};

export type QuizGenre = {
  genre_id: number;
  name: string;
  description?: string;
  total_questions: number;
  pass_score: number;
  created_at?: string;
};

export type QuizOption = {
  option_id: number;
  option_text: string;
  is_correct?: boolean;
};

export type QuizQuestion = {
  question_id: number;
  question: string;
  options: QuizOption[];
};

export type QuizAnswer = {
  question_id: number;
  option_id: number;
};

export type QuizAttempt = {
  attempt_id: number;
  user_id: number;
  genre_id: number;
  genre_name?: string;
  score: number;
  total_questions: number;
  pass_score: number;
  passed: boolean;
  started_at: string;
  completed_at?: string;
  status: 'in_progress' | 'completed';
};

export type QuizAttemptDetail = QuizAttempt & {
  answers: Array<{
    answer_id?: number;
    question_id: number;
    question: string;
    option_id: number;
    option_text: string;
    is_correct: boolean;
  }>;
};

export type Documentation = {
  doc_id: number;
  video_fk: number;
  title: string;
  content: string;
  course_id: number;
};