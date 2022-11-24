import { env } from '@config/env';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './adapters/controllers/auth.controller';
import { UserEntity } from './adapters/db/models/user.entity';
import { AuthProviders } from './auth.providers';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: env.jwtSecret,
      signOptions: {
        expiresIn: env.jwtExpiresIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [...AuthProviders],
  exports: [],
})
export class AuthModule {}
