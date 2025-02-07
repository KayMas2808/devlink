import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule, JwtModule],
  exports: [UserService],
})
export class UserModule {}
