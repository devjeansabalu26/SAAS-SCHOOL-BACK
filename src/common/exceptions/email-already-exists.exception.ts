import {
  ConflictException,
} from '@nestjs/common';

export class EmailAlreadyExistsException
  extends ConflictException {

  constructor() {
    super(
      'El correo ya existe',
    );
  }
}