import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [UserController],
  providers: [UserService, ConfigService],
  imports: [PrismaModule, JwtModule],
  exports: [UserService],
})
export class UserModule {}
