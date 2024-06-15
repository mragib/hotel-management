import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'tangooYankee51',
      // signOptions: {
      //   expiresIn: 3600,
      // },
    }),
    UserModule,
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],

  // exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
