
export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  video?: string;
  year: string;
  description?: string;
  technologies?: string[];
  client?: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  tags: string[];
}

export enum NavState {
  HIDDEN = 'HIDDEN',
  VISIBLE = 'VISIBLE',
  SCROLLED = 'SCROLLED'
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
