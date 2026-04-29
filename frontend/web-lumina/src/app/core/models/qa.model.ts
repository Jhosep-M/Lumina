// qa.model.ts
export interface Question {
  id: string;
  lessonId: string;
  user: { id: string; name: string; avatar?: string };
  content: string;
  createdAt: string;
  replies: Reply[];
  upvotes: number;
}

export interface Reply {
  id: string;
  user: { id: string; name: string };
  content: string;
  createdAt: string;
}