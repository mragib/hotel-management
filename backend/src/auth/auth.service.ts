import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

import { JwtPayload } from './jwt-payload.interface';
import { TokenService } from 'src/token/token.service';
import { Request, Response } from 'express';
import { MoreThanOrEqual } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}
  async create(createAuthDto: CreateUserDto) {
    return await this.userService.create(createAuthDto);
  }

  async signin(
    authCredentialsDto: AuthCredentialsDto,
    response,
  ): Promise<{ token: string }> {
    const username =
      await this.userService.valivateCredentials(authCredentialsDto);

    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const user = await this.userService.findOne({ username });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { salt, password, ...data } = user;

    const payload: JwtPayload = { username, userId: data.id };

    // const currentUser = {
    //   ...data,
    // };
    // const accessToken = await this.jwtService.sign(payload);
    const accessToken = await this.jwtService.signAsync(
      { payload },
      { expiresIn: '30s' },
    );

    const refreshToken = await this.jwtService.signAsync({ payload });

    const expired_at = new Date();

    expired_at.setDate(expired_at.getDate() + 7);

    await this.tokenService.save({
      user_id: data.id,
      token: refreshToken,
      expired_at,
    });

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    response.status(200);

    return { token: accessToken };
  }

  async authUser(request: Request) {
    try {
      const accessToken = request.headers.authorization.replace('Bearer ', '');

      const { id } = await this.jwtService.verifyAsync(accessToken);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, isBlocked, salt, ...data } =
        await this.userService.findOne({ id });

      return data;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async refreshToken(request: Request, response: Response) {
    try {
      const refreshToken = request.cookies['refresh_token'];

      const { id } = await this.jwtService.verifyAsync(refreshToken);

      const entityToken = await this.tokenService.findOne({
        user_id: id,
        expired_at: MoreThanOrEqual(new Date()),
      });

      if (!entityToken) throw new UnauthorizedException();

      const accessToken = await this.jwtService.signAsync(
        { id },
        { expiresIn: '30s' },
      );
      response.status(200);
      return { token: accessToken };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async logout(request: Request, response: Response) {
    const refreshToken = request.cookies['refresh_token'];
    const { user_id } = await this.tokenService.findOne({
      token: refreshToken,
    });

    await this.tokenService.delete({ user_id });
    response.clearCookie('refresh_token');

    return {
      message: 'success',
    };
  }
}
