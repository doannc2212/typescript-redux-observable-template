import { ZodObject } from 'zod';
// {
//   "status": 400,
//   "code": "101",
//   "message": "Constraint violation",
//   "data": null,
//   "validation": [
//     {
//       "target": "emailField",
//       "message": "msg_002"
//     }
//   ],
//   "error": null
// }
//
// {
//   "status": 401,
//   "code": "19",
//   "message": "Unauthorized",
//   "data": null,
//   "validation": null,
//   "error": "msg_004"
// }

type IndexedObject<T = any> = { [key: string]: T };
export type ValidationSchema = ZodObject<any>;
export type THooks<T> = () => T;

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

export type ApiResponse<T = unknown> = {
  message?: string;
  data?: T;
  error?: TError;
  status?: number;
};
export default IndexedObject;
