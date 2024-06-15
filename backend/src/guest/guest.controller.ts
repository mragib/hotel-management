import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
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

@ApiTags('Guest')
@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @ApiCreatedResponse({ description: 'Guest created' })
  @ApiBearerAuth()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiConflictResponse({ description: 'Email should be unique' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  create(@Body() createGuestDto: CreateGuestDto) {
    return this.guestService.create(createGuestDto);
  }

  @ApiOkResponse({ description: 'All guest' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  findAll() {
    return this.guestService.findAll();
  }

  @ApiOkResponse({ description: 'Guest details' })
  @ApiBearerAuth()
  @ApiNotFoundResponse({ description: 'Guest is not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guestService.findOne(+id);
  }

  @ApiOkResponse({ description: 'Guest updated' })
  @ApiBearerAuth()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiConflictResponse({ description: 'Guest email should be unique' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server error' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuestDto: UpdateGuestDto) {
    return this.guestService.update(+id, updateGuestDto);
  }

  @ApiOkResponse({ description: 'Guest deleted' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Guest is not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guestService.remove(+id);
  }
}
