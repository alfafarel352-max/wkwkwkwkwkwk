
export interface User {
  id: string;
  username: string;
  email: string;
}

export interface PostAttachment {
  name: string;
  size: number;
  type: string;
  data: string; // Base64 string for simulation
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  category: 'script' | 'tutorial' | 'qna';
  createdAt: string;
  attachment?: PostAttachment;
  replies?: Reply[];
}

export interface Reply {
  id: string;
  content: string;
  authorName: string;
  createdAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}
