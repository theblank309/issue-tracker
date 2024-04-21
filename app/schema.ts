import { z } from 'zod';

export const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
});

export interface IssueResponse {
    id: number;
    title: string;
    createdAt: string;
    status: Status;
    description: string;
}
  
export enum Status {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    CLOSED = "CLOSED",
}