import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Request, Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiResponse({
    status: 201,
    description: 'The user has been created',
  })
  @ApiBadRequestResponse({
    description: 'You need to provide all information and strong password',
  })
  @ApiConflictResponse({ description: 'Email or username must be unique' })
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  @ApiOkResponse({ description: 'Return access token and set refresh token' })
  @ApiUnauthorizedResponse({ description: 'Invalid Cred' })
  signin(
    @Body() createAuthDto: AuthCredentialsDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signin(createAuthDto, response);
  }

  @ApiExcludeEndpoint()
  @Get('auth-user')
  async user(@Req() request: Request) {
    return await this.authService.authUser(request);
  }

  @ApiExcludeEndpoint()
  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.refreshToken(request, response);
  }

  @Post('logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    return await this.authService.logout(request, response);
  }
}
