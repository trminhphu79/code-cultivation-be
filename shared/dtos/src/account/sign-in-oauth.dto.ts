import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInOauth {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The token of the provider after authorized.',
  })
  token!: string;

  @IsNotEmpty()
  @ApiProperty({
    description:
      'The credential type that user using for sign in, GOOGLE or GITHUB',
  })
  credentialType!: string;
}
