import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from 'src/users/mongo_schema/users.mongo_schema'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Model } from 'mongoose'
import { TRegistrationBodyDto } from './validators/user-registration.schema'
import * as bcrypt from 'bcrypt'
import { TRBACRoles } from 'src/common/enums/roles.enums'
import { TLoginBodyDto } from './validators/user-login.schema'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async registration(data: TRegistrationBodyDto) {
    const userExists = await this.userModel.findOne({ email: data.email })
    if (userExists) throw new ForbiddenException('User with this email already exists.')

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const createdUser = await this.userModel.create({
      ...data,
      password: hashedPassword,
      interests: data.interests || [],
      role: TRBACRoles.USER
    })

    const payload = {
      sub: createdUser.id, // sub is the standard JWT claim for the user id
      email: createdUser.email,
      role: createdUser.role
    }

    const token = await this.generateToken(payload)

    return {
      access_token: token,
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role
      }
    }
  }

  async login(data: TLoginBodyDto) {
    const user = await this.userModel.findOne({ email: data.email })
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const isMatch = await bcrypt.compare(data.password, user.password)
    if (!isMatch) throw new UnauthorizedException('Invalid credentials')

    const payload = {
      sub: user.id, // sub is the standard JWT claim for the user id
      email: user.email,
      role: user.role
    }
    const token = await this.generateToken(payload)

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    }
  }

  async validateAccessTokenUser(id: string) {
    const user = await this.userModel.findById(id)
    if (!user) throw new NotFoundException(`Invalid credentials.`)
    return { id: user._id.toString(), email: user.email, role: user.role }
  }

  private async generateToken(payload) {
    const accessToken = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: `${this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRY')}m`
      })
    ])

    return accessToken
  }
}
