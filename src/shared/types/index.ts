import { ZodObject } from 'zod';
type IndexedObject<T = any> = { [key: string]: T };
export type ValidationSchema = ZodObject<any>;
export type THooks<T> = () => T;

export type TServiceResult<T = unknown> = {
  data: T | null;
  error: TError | null;
  warning?: string;
};

export interface PaginationResponse<T = unknown> {
  current: number;
  total: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
  data: T[];
}

export interface TError {
  code: string | number;
  message: string;
  details?: Record<string, TError[]>;
}

export type ApiResponse<T = any> = {
  message?: string;
  data?: T;
  error?: TError;
  status?: number;
};

export type TServiceFunction<T = unknown, R = unknown> = (
  data: T,
  warings?: string,
  ...args: unknown[]
) => Promise<TServiceResult<R>>;

export * from './infer';

export default IndexedObject;
