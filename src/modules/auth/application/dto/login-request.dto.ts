import { ApiProperty } from '@nestjs/swagger';
import { EMAIL_REGEX_PATTERN } from '@shared/consts';
import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(EMAIL_REGEX_PATTERN, {
    message: 'invalid email format',
  })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
