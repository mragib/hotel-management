import { ConflictException, Injectable } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';

import { AbstractService } from 'src/common/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Guest } from './entities/guest.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GuestService extends AbstractService {
  constructor(
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
  ) {
    super(guestRepository);
  }
  async create(createGuestDto: CreateGuestDto) {
    const { email } = createGuestDto;
    const room = await this.findOne({ email });
    if (room) throw new ConflictException('The email is already exiets');
    return this.guestRepository.save(createGuestDto);
  }
}
