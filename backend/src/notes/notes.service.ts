import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Note, NoteDocument } from './mongo_schema/notes.mongo_schema'
import { Model, Types } from 'mongoose'
import { TCreateNoteBodyDto } from './validators/create-note.schema'
import { TPaginationZodValDto } from 'src/common/validators/pagination.schema'
import { TPaginateOrderBy } from 'src/common/enums/pagination.enums'
import { TUpdateNoteBodyDto } from './validators/update-note.schema'
import { TCurrentUser } from 'src/common/decorators/current-user.decorator'
import { TRBACRoles } from 'src/common/enums/roles.enums'

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(currentUser: TCurrentUser, data: TCreateNoteBodyDto) {
    const note = await this.noteModel.create({ ...data, author: new Types.ObjectId(currentUser.id) })

    return note
  }

  async findAll(currentUser: TCurrentUser, query: TPaginationZodValDto) {
    const isAdmin = currentUser.role === TRBACRoles.ADMIN
    const filter = isAdmin ? {} : { author: new Types.ObjectId(currentUser.id) }

    const { limit, page, orderBy, order } = query
    const skip = (page - 1) * limit
    const sortDirection = order === TPaginateOrderBy.ASC ? 1 : -1

    const [items, total] = await Promise.all([
      this.noteModel.find(filter, {}, { sort: { [orderBy]: sortDirection }, skip, limit, lean: true }),
      this.noteModel.countDocuments()
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

  async findOne(currentUser: TCurrentUser, id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user id')
    }
    const note = await this.noteModel.findById(id).lean()
    if (!note) throw new NotFoundException('Note not found')
    if (note.author.toString() !== currentUser.id) throw new ForbiddenException(`This note doesn't belong to you`)

    return note
  }

  async update(currentUser: TCurrentUser, id: string, data: TUpdateNoteBodyDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user id')
    }
    const note = await this.noteModel.findById(id).lean()
    if (!note) throw new NotFoundException('Note not found')
    if (note.author.toString() !== currentUser.id) throw new ForbiddenException(`This note doesn't belong to you`)

    const updateData = { ...data, author: new Types.ObjectId(currentUser.id) }

    const updatedNote = await this.noteModel.findByIdAndUpdate(id, updateData, { new: true }).lean()

    return updatedNote
  }

  async remove(currentUser: TCurrentUser, id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user id')
    }

    const note = await this.noteModel.findById(id).lean()
    if (!note) throw new NotFoundException('Note not found')
    if (note.author.toString() !== currentUser.id) throw new ForbiddenException(`This note doesn't belong to you`)

    await this.noteModel.findByIdAndDelete(id)

    return true
  }
}
