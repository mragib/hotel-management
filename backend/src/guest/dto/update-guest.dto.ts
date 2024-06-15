import { CreateGuestDto } from './create-guest.dto';
import { PickType } from '@nestjs/swagger';

export class UpdateGuestDto extends PickType(CreateGuestDto, [
  'fullName',
  'email',
  'nationalID',
] as const) {}
