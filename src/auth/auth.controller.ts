import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from 'src/decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
}
