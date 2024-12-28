import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';

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
  @Post('updateStreak')
  @ApiOperation({ summary: 'Update Streak' })
  updateStreak(@Body() dto: UpdateStreakDto) {
    return {
      message: 'update successfully',
      data: dto,
    };
  }

  @Post('updateExp')
  @ApiOperation({ summary: 'Update Exp' })
  updateExp(@Body() dto: UpdateExpDto) {
    return {
      message: 'update exp successfully',
      data: dto,
    };
  }
}
