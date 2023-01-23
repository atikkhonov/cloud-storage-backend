import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { JwtAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMe(@UserId() id: string) {
    return this.usersService.findById(+id);
  }
}
