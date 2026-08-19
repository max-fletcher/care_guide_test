import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegistrationSchema, type TRegistrationZodValDto } from './validators/user-registration.schema'
import { ZodValidationPipe } from 'src/common/pipes/zod-validate.pipes'
import { formattedResponse } from 'src/common/utils/formatters/responses.formatter'
import { LoginSchema, type TLoginZodValDto } from './validators/user-login.schema'

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body(new ZodValidationPipe(RegistrationSchema)) registrationBodyDto: TRegistrationZodValDto) {
    const registerData = await this.authService.registration(registrationBodyDto)

    return formattedResponse(registerData)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body(new ZodValidationPipe(LoginSchema)) loginBodyDto: TLoginZodValDto) {
    const loginData = await this.authService.login(loginBodyDto)

    return formattedResponse(loginData)
  }
}
