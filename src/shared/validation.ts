// TODO: intl
import { z } from 'zod';

const id = z.number().int();
const link = z
  .string()
  .regex(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    'Enter correct url!',
  );
const email = z.string().email();
const username = z.string().min(6).max(32);
const password = z.string().min(8).max(20);

export const Validation = Object.freeze({
  id,
  link,
  email,
  password,
  username,
});
