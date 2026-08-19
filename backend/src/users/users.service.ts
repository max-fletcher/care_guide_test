import { Model, Types } from 'mongoose'
import { User, UserDocument } from './mongo_schema/users.mongo_schema'
import { TCreateUserBodyDto } from './validators/create-user.schema'
import { InjectModel } from '@nestjs/mongoose'
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { TPaginationZodValDto } from 'src/common/validators/pagination.schema'
import { TPaginateOrderBy } from 'src/common/enums/pagination.enums'
import { TUpdateUserBodyDto } from './validators/update-user.schema'
import { SALT_ROUNDS } from 'src/common/const/auth.const'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: TCreateUserBodyDto) {
    const existing = await this.userModel.findOne({ email: data.email }).lean()
    if (existing) throw new ConflictException('User with this email already exists')

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS)
    const user = await this.userModel.create({
      ...data,
      password: hashedPassword
    })

    const { password, ...safeUser } = user.toObject()
    console.log(safeUser, user.toObject())

    return safeUser
  }

  async findAll(query: TPaginationZodValDto) {
    const { limit, page, orderBy, order } = query
    const skip = (page - 1) * limit
    const sortDirection = order === TPaginateOrderBy.ASC ? 1 : -1

    const [items, total] = await Promise.all([
      this.userModel.find({}, { password: 0 }, { sort: { [orderBy]: sortDirection }, skip, limit, lean: true }),
      this.userModel.countDocuments()
    ])
    const next = limit + skip < total
    const previous = page > 1

    const result = {
      limit,
      page,
      total,
      next,
      previous,
      totalPages: Math.ceil(total / limit),
      items
    }

    return result
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user id')
    }
    const user = await this.userModel.findById(id, { password: 0 }).lean()
    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async update(id: string, data: TUpdateUserBodyDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user id')
    }

    const existing = await this.userModel.findOne({ email: data.email }).lean()
    if (existing) throw new ConflictException('User with this email already exists')

    const updateData = data
    if (data.password) updateData.password = await bcrypt.hash(data.password, SALT_ROUNDS)
    const user = await this.userModel.findByIdAndUpdate(id, updateData, { new: true, projection: { password: 0 } }).lean()
    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user id')
    }

    const deletedUser = await this.userModel.findByIdAndDelete(id).lean()
    if (!deletedUser) throw new NotFoundException('User not found')

    return true
  }

  groupByInterests() {
    return this.userModel.aggregate([
      { $unwind: '$interests' },
      {
        $group: {
          _id: '$interests',
          users: {
            $push: { _id: '$_id', name: '$name', email: '$email' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      {
        $project: {
          _id: 0,
          interest: '$_id',
          count: 1,
          users: 1
        }
      }
    ])
  }
}
