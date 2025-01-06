import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { DeleteAccountDto } from '@shared/dtos/account';
import { Public } from '@shared/guard';
import { ProfileMsgPattern } from '@shared/message-pattern/account';

class UpdateStreakDto {
  @ApiProperty()
  id: string;
}

class UpdateExpDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  exp: number;
}

@Controller('profile')
export class ProfileController {
  constructor(
    @Inject('NATS_SERVICE')
    private natsClient: ClientProxy
  ) {}

  @Patch('updateStreak')
  @ApiOperation({ summary: 'Update Streak' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  updateStreak(@Body() dto: UpdateStreakDto) {
    return {
      message: 'update successfully',
      data: dto,
    };
  }

  @Patch('updateExp')
  @ApiOperation({ summary: 'Update Exp' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  updateExp(@Body() dto: UpdateExpDto) {
    return {
      message: 'update exp successfully',
      data: dto,
    };
  }

  @Delete('delete/:id')
  @Public()
  @ApiOperation({ summary: 'Pernament delete account.' })
  delete(@Param('id') id: string) {
    return this.natsClient.send(ProfileMsgPattern.Delete, { id });
  }
}
