export interface Log{
  id: string;
  message?: string; // Optional if message isn't always present
  timestamp: number;
  success?: number; // Include additional fields if they are part of your log
}