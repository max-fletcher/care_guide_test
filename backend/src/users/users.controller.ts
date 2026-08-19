import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, HttpStatus, HttpCode } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Roles } from 'src/common/decorators/RBAC/roles.decorator'
import { TRBACRoles } from 'src/common/enums/roles.enums'
import { TRBACActions, TRBACResources } from 'src/common/enums/permissions.enums'
import { Permissions } from 'src/common/decorators/RBAC/permissions.decorator'
import { CreateUserSchema, type TCreateUserBodyDto } from './validators/create-user.schema'
import { formattedResponse } from 'src/common/utils/formatters/responses.formatter'
import { ZodValidationPipe } from 'src/common/pipes/zod-validate.pipes'
import { PaginationSchema, type TPaginationZodValDto } from 'src/common/validators/pagination.schema'
import { GET_USERS_PAGINATED_FIELDS } from './enums/pagination.enums'
import { JwtAuthGuard } from 'src/common/guards/access-token.guard'
import { type TUpdateUserBodyDto, UpdateUserSchema } from './validators/update-user.schema'
import { RbacGuard } from 'src/common/guards/rbac.guard'

@Roles(TRBACRoles.ADMIN)
@UseGuards(JwtAuthGuard, RbacGuard)
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(new ZodValidationPipe(CreateUserSchema)) createUserBodyDto: TCreateUserBodyDto) {
    return formattedResponse({
      user: await this.usersService.create(createUserBodyDto)
    })
  }

  @Get()
  async findAll(
    @Query(new ZodValidationPipe(PaginationSchema(GET_USERS_PAGINATED_FIELDS, GET_USERS_PAGINATED_FIELDS.slice(-1)[0])))
    query: TPaginationZodValDto
  ) {
    return formattedResponse({
      users: await this.usersService.findAll(query)
    })
  }

  @Get('group-by-interests')
  async groupByInterests() {
    return formattedResponse({
      usersGroupedByInterest: await this.usersService.groupByInterests()
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return formattedResponse({
      user: await this.usersService.findOne(id)
    })
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body(new ZodValidationPipe(UpdateUserSchema)) updateUserBodyDto: TUpdateUserBodyDto) {
    return formattedResponse({
      updatedData: await this.usersService.update(id, updateUserBodyDto)
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return formattedResponse({
      deleted: await this.usersService.remove(id)
    })
  }
}
