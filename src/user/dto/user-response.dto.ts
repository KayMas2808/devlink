import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

export class UserResponseDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
    required: false,
  })
  @Expose()
  firstName?: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    required: false,
  })
  @Expose()
  lastName?: string;

  @ApiProperty({
    description: 'User avatar URL',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @Expose()
  avatar?: string;

  @ApiProperty({
    description: 'User phone number',
    example: '+1234567890',
    required: false,
  })
  @Expose()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Email verification status',
    example: true,
  })
  @Expose()
  isEmailVerified: boolean;

  @ApiProperty({
    description: 'Phone verification status',
    example: false,
  })
  @Expose()
  isPhoneVerified: boolean;

  @ApiProperty({
    description: 'User active status',
    example: true,
  })
  @Expose()
  isActive: boolean;

  @ApiProperty({
    description: 'Last login timestamp',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  @Expose()
  lastLoginAt?: Date;

  @ApiProperty({
    description: 'Two-factor authentication status',
    example: false,
  })
  @Expose()
  twoFactorEnabled: boolean;

  @ApiProperty({
    description: 'Account creation timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Account last update timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  @Expose()
  updatedAt: Date;

  @ApiProperty({
    description: 'User role information',
    type: 'object',
  })
  @Expose()
  @Type(() => Object)
  role: {
    id: string;
    name: string;
    description?: string;
  };

  // Exclude sensitive fields
  @Exclude()
  password: string;

  @Exclude()
  twoFactorSecret?: string;

  @Exclude()
  deletedAt?: Date;
}

export class PaginatedUserResponseDto {
  @ApiProperty({
    description: 'Array of users',
    type: [UserResponseDto],
  })
  data: UserResponseDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: 'object',
  })
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
} 