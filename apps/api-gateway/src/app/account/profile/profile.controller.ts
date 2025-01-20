import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OwnerGuard } from '@shared/guard';
import { ProfileMsgPattern } from '@shared/message-pattern/account';
import {
  CreateSocialProfileDto,
  UpdateSocialProfileDto,
  DeleteSocialProfileDto,
} from '@shared/dtos/account';

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

@UseGuards(OwnerGuard)
@Controller('profile')
@ApiTags('Profile')
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
  @ApiOperation({ summary: 'Pernament delete account.' })
  delete(@Param('id') id: string) {
    return this.natsClient.send(ProfileMsgPattern.Delete, { id });
  }

  @Get('social/findAll')
  @ApiOperation({ summary: 'Add Social Profile' })
  @ApiResponse({
    status: 201,
    description: 'Social profile added successfully.',
  })
  getSocialProfile(@Param('id') id: string) {
    return this.natsClient.send(ProfileMsgPattern.GetSocialProfile, id);
  }

  @Post('social/create')
  @ApiOperation({ summary: 'Add Social Profile' })
  @ApiResponse({
    status: 201,
    description: 'Social profile added successfully.',
  })
  addSocialProfile(@Body() body: CreateSocialProfileDto) {
    return this.natsClient.send(ProfileMsgPattern.DeleteSocialProfile, body);
  }

  @Patch('social/update/:id')
  @ApiOperation({ summary: 'Update Social Profile' })
  @ApiResponse({
    status: 200,
    description: 'Social profile updated successfully.',
  })
  updateSocialProfile(
    @Param('id') id: string,
    @Body() body: UpdateSocialProfileDto
  ) {
    return this.natsClient.send(ProfileMsgPattern.UpdateSocialProfile, {
      id,
      body,
    });
  }

  @Delete('social/delete/:id')
  @ApiOperation({ summary: 'Delete Social Profile' })
  @ApiResponse({
    status: 200,
    description: 'Social profile deleted successfully.',
  })
  deleteSocialProfile(@Param('id') id: string) {
    return this.natsClient.send(ProfileMsgPattern.DeleteSocialProfile, {
      id,
    });
  }
}
