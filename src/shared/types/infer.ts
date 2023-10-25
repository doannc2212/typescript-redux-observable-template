import { Validation } from '@shared/validation';
import { z } from 'zod';

export type ID = z.infer<typeof Validation.id>;
export type Link = z.infer<typeof Validation.link>;
export type Email = z.infer<typeof Validation.email>;
export type Username = z.infer<typeof Validation.username>;
export type Password = z.infer<typeof Validation.password>;
