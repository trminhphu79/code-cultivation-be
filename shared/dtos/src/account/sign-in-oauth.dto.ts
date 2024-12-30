import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInOauth {
  @IsNotEmpty()
  @ApiProperty({
    example: 'codetmp77799',
    description: 'The code of the provider after authenticate.',
  })
  code!: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'GITHUB',
    description:
      'The credential type that user using for sign in, GOOGLE or GITHUB',
  })
  credentialType!: string;
}
