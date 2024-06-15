import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';

import { AbstractService } from 'src/common/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService extends AbstractService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
  ) {
    super(roomRepository);
  }
  async create(createRoomDto: CreateRoomDto) {
    const { name } = createRoomDto;
    const room = await this.findOne({ name });
    if (room) throw new ConflictException('The name is already exiets');
    return this.roomRepository.save(createRoomDto);
  }
}
