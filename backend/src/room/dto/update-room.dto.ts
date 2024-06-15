import { CreateRoomDto } from './create-room.dto';
import { PickType } from '@nestjs/swagger';

export class UpdateRoomDto extends PickType(CreateRoomDto, [
  'name',
  'description',
  'price',
  'maxCapacity',
]) {}
