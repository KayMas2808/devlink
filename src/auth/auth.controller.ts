import { 
  Controller, 
  Post, 
  Body, 
  HttpCode, 
  HttpStatus, 
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { 
  SignupDto, 
  LoginDto, 
  ForgotPasswordDto, 
  ResetPasswordDto,
  VerifyEmailDto,
} from './dto';

@ApiTags('Authentication')
@Controller({ path: 'auth', version: '1' })
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Register a new user account',
    description: 'Creates a new user account with email verification required',
  })
  @ApiResponse({ 
    status: 201, 
    description: 'User successfully registered. Verification email sent.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'User registered successfully. Please check your email for verification.' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
            email: { type: 'string', example: 'user@example.com' },
            name: { type: 'string', example: 'John Doe' },
            isEmailVerified: { type: 'boolean', example: false },
          },
        },
      },
    },
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid input data or email already exists',
  })
  @ApiResponse({ 
    status: 429, 
    description: 'Too many requests - rate limit exceeded',
  })
  @ApiBody({ type: SignupDto })
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Login to user account',
    description: 'Authenticates user credentials and returns JWT access token',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Login successful' },
        data: {
          type: 'object',
          properties: {
            accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                name: { type: 'string' },
                role: { type: 'object' },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Invalid credentials or email not verified',
  })
  @ApiResponse({ 
    status: 429, 
    description: 'Too many login attempts - rate limit exceeded',
  })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto, @Req() req: any) {
    return this.authService.login(loginDto, {
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Verify email address',
    description: 'Verifies user email address using verification token',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Email verified successfully',
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid or expired verification token',
  })
  @ApiBody({ type: VerifyEmailDto })
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(verifyEmailDto.token);
  }

  @Post('resend-verification')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Resend email verification',
    description: 'Resends email verification token to user email',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Verification email sent successfully',
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Email already verified or user not found',
  })
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email', example: 'user@example.com' },
      },
      required: ['email'],
    },
  })
  async resendVerification(@Body('email') email: string) {
    return this.authService.resendVerificationEmail(email);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Request password reset',
    description: 'Sends password reset link to user email',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Password reset email sent successfully',
  })
  @ApiResponse({ 
    status: 404, 
    description: 'User not found',
  })
  @ApiBody({ type: ForgotPasswordDto })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Reset password',
    description: 'Resets user password using reset token',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Password reset successfully',
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid or expired reset token',
  })
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.token, 
      resetPasswordDto.password,
    );
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Refresh access token',
    description: 'Generates new access token using refresh token',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Token refreshed successfully',
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Invalid refresh token',
  })
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      },
      required: ['refreshToken'],
    },
  })
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Get current user profile',
    description: 'Returns current authenticated user profile information',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User profile retrieved successfully',
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - invalid or missing token',
  })
  async getProfile(@Req() req: any) {
    return this.authService.getProfile(req.user.id);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Logout user',
    description: 'Invalidates user session and tokens',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Logged out successfully',
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - invalid or missing token',
  })
  async logout(@Req() req: any) {
    return this.authService.logout(req.user.id, req.headers.authorization);
  }

  @Post('logout-all')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Logout from all devices',
    description: 'Invalidates all user sessions and tokens across all devices',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Logged out from all devices successfully',
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - invalid or missing token',
  })
  async logoutAll(@Req() req: any) {
    return this.authService.logoutAll(req.user.id);
  }
}
