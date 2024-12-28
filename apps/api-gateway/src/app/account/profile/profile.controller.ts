import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
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

  @Post('updateExp')
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
}
