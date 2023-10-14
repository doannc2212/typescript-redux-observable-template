import { AxiosError } from 'axios';
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
export type TOption<T = string, S = string> = { id: T; value: S };
export type TFuncOption<T = string, S = string> = TOption<T, S> & {
  func?: () => void;
};
export type TLinkOption<T = string, S = string> = TOption<T, S> & {
  link?: string;
};
export type TImageOption<T = string, S = string> = TOption<T, S> & {
  image?: string;
};
export type TState = { error?: string; isLoading: boolean };
export type TValidationError = { target: string; message: string };
export interface TError extends Omit<AxiosError<string, any>, 'message'> {
  message?: string;
  validation?: TValidationError[];
  retryable?: number;
}

export default IndexedObject;
