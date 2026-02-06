export type Filter = "all" | "active" | "completed";

export interface Todo {
  id: number;        
  text: string;      
  completed: boolean;
}
