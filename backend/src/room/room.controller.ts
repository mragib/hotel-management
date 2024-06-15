import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Rooms')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiCreatedResponse({ description: 'room created' })
  @ApiBearerAuth()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiConflictResponse({ description: 'Room name should be unique' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @ApiOkResponse({ description: 'All rooms' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @ApiOkResponse({ description: 'Single room details' })
  @ApiBearerAuth()
  @ApiNotFoundResponse({ description: 'Room is not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const found = await this.roomService.findOne({ id });
    if (!found) throw new NotFoundException('Room is not found');
  }

  @ApiOkResponse({ description: 'Room updated' })
  @ApiBearerAuth()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiConflictResponse({ description: 'Room name should be unique' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server error' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @ApiOkResponse({ description: 'Room deleted' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Room is not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
}
