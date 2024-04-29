import { z } from 'zod';

export interface IssueResponse {
    id: number;
    title: string;
    createdAt: string;
    status: Status;
    description: string;
}
  
export enum Status {
    ALL = 'ALL',
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    CLOSED = "CLOSED",
}

export const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
    status: z.nativeEnum(Status).optional()
});

