import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInOauth {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The code of the provider after authenticate.',
  })
  code!: string;

  @IsNotEmpty()
  @ApiProperty({
    description:
      'The credential type that user using for sign in, GOOGLE or GITHUB',
  })
  credentialType!: string;
}
