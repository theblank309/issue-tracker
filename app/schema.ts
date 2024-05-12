import { z } from 'zod';

export interface IssueResponse {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
    status: Status;
    description: string;
    impact: Impact
}
  
export enum Status {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    CLOSED = "CLOSED",
}

export enum Impact {
    HIGH = "HIGH",
    MODERATE = "MODERATE",
    LOW = "LOW",
}

export enum SummaryOptions {
    OVERALL = "OVERALL",
    CURRENT_MONTH = "CURRENT_MONTH",
    CURRENT_YEAR = "CURRENT_YEAR",
}

export const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
    status: z.nativeEnum(Status).optional()
});

