import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength, Matches, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name?: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  firstName?: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  lastName?: string;

  @ApiProperty({
    description: 'User phone number',
    example: '+1234567890',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/, { message: 'Phone number must be in international format' })
  phoneNumber?: string;

  @ApiProperty({
    description: 'Whether two-factor authentication is enabled',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  twoFactorEnabled?: boolean;
} 