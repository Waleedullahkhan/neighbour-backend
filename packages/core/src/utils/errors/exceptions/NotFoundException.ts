import { NOT_FOUND } from '../../enums/error.enum';

export class NotFoundException extends Error {
  public status: number;
  public message: string;

  constructor(message?: string) {
    super(message);
    this.status = 404;
    this.name = 'NotFoundException';
    this.message = message ?? NOT_FOUND;
  }
}
