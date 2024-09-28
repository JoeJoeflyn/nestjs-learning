import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from 'src/decorator';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../passport/local-auth.guard';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from '../dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @Public()
  @ApiOkResponse({
    description: 'User has successfully logged in.',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @ApiForbiddenResponse({ description: 'Access forbidden.' })
  @UseGuards(LocalAuthGuard)
  async signIn(@Body() loginDto: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  @Public()
  @ApiCreatedResponse({ description: 'User has been successfully created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
}
