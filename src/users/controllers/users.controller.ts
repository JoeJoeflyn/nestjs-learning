import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto';
import { UserService } from '../services';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  findAll() {
    return this.usersService.users(); // Fetch all users
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id); // Delete user by ID
  }
}
