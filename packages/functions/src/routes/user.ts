import { ApiHandler } from 'sst/node/api';
import {
  create as createUser,
  update as updateUser,
  get as getUser,
} from '@neighbours/core/controller/users.controller';

import withHandler from '@neighbours/core/middleware/withHandler';

export const create = ApiHandler(withHandler(createUser));
export const update = ApiHandler(withHandler(updateUser));
export const get = ApiHandler(withHandler(getUser));
