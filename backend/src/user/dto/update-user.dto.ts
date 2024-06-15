import { CreateUserDto } from './create-user.dto';
import { PickType } from '@nestjs/swagger';

export class UpdateUserDto extends PickType(CreateUserDto, [
  'first_name',
  'last_name',
  'email',
  'phone',
  'password',
  'address',
] as const) {}
