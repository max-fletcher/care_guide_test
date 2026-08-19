import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { TCreatePostBodyDto } from './validators/create-post.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Post, PostDocument } from './mongo_schema/posts.mongo_schema'
import { TPaginationZodValDto } from 'src/common/validators/pagination.schema'
import { TPaginateOrderBy } from 'src/common/enums/pagination.enums'
import { TUpdatePostBodyDto } from './validators/update-post.schema'

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(data: TCreatePostBodyDto) {
    const post = await this.postModel.create({ ...data, author: new Types.ObjectId(data.author) })

    return post
  }

  async findAll(query: TPaginationZodValDto) {
    const { limit, page, orderBy, order } = query
    const skip = (page - 1) * limit
    const sortDirection = order === TPaginateOrderBy.ASC ? 1 : -1

    const [items, total] = await Promise.all([
      this.postModel.find({}, {}, { sort: { [orderBy]: sortDirection }, skip, limit, lean: true }),
      this.postModel.countDocuments()
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
    const post = await this.postModel.findById(id).lean()
    if (!post) throw new NotFoundException('Post not found')

    return post
  }

  async update(id: string, data: TUpdatePostBodyDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user id')
    }

    const updateData = { ...data, author: new Types.ObjectId(data.author) }

    const post = await this.postModel.findByIdAndUpdate(id, updateData, { new: true }).lean()
    if (!post) throw new NotFoundException('Post not found')

    return post
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user id')
    }

    const deletedPost = await this.postModel.findByIdAndDelete(id).lean()
    if (!deletedPost) throw new NotFoundException('Post not found')

    return true
  }

  findByUser(userId: string) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user id')
    }

    return this.postModel.aggregate([
      { $match: { author: new Types.ObjectId(userId) } },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author',
          pipeline: [{ $project: { name: 1, email: 1 } }]
        }
      },
      { $unwind: '$author' },
      {
        $project: {
          title: 1,
          content: 1,
          createdAt: 1,
          author: 1
        }
      }
    ])
  }
}
