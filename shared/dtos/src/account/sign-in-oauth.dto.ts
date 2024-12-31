import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInOauth {
  @IsNotEmpty()
  @ApiProperty({
    example: 'token3912491923123',
    description: 'The token of the provider after authenticate.',
  })
  token!: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'GITHUB',
    description:
      'The credential type that user using for sign in, GOOGLE or GITHUB',
  })
  credentialType!: string;
}
