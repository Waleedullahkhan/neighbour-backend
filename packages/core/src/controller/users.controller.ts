import { getUser } from '../entity/user/service';
import { withValidation } from '../middleware/withValidation';
import {
  createUserValidation,
  updateUserValidation,
} from '../validator/user.validation';
import { Request } from '../interfaces/request.interface';
import { NotFoundException } from '../utils/errors/exceptions';
import { USER_NOT_FOUND } from '../utils/enums/error.enum';
import { withParamValidation } from '../middleware/withParamValidation';
import { createUser, updateUser } from '../entity/user/action';

export const create = withValidation(createUserValidation)(async (
  request: Request,
) => {
  const createdUser = await createUser(request.body);
  return createdUser;
});

export const update = withParamValidation()(
  withValidation(updateUserValidation)(async (request: Request) => {
    const { params, body } = request;

    const updatedUser = await updateUser(params.id, body);

    if (!updatedUser) throw new NotFoundException(USER_NOT_FOUND);

    return updatedUser;
  }),
);

export const get = withParamValidation()(async (request: Request) => {
  const { params } = request;

  const user = await getUser(params.id);

  if (!user) throw new NotFoundException(USER_NOT_FOUND);

  return user;
});
