import { Controller, Get, Body, Patch, Param, Delete, Query, Post, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import { NotesService } from './notes.service'
import { ZodValidationPipe } from 'src/common/pipes/zod-validate.pipes'
import { CreateNoteSchema, type TCreateNoteBodyDto } from './validators/create-note.schema'
import { formattedResponse } from 'src/common/utils/formatters/responses.formatter'
import { PaginationSchema, type TPaginationZodValDto } from 'src/common/validators/pagination.schema'
import { GET_NOTES_PAGINATED_FIELDS } from './enums/pagination.enums'
import { type TUpdateNoteBodyDto, UpdateNoteSchema } from './validators/update-note.schema'
import { CurrentUser, type TCurrentUser } from 'src/common/decorators/current-user.decorator'
import { JwtAuthGuard } from 'src/common/guards/access-token.guard'

@UseGuards(JwtAuthGuard)
@Controller({ path: 'notes', version: '1' })
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@CurrentUser() currentUser: TCurrentUser, @Body(new ZodValidationPipe(CreateNoteSchema)) createNoteBodyDto: TCreateNoteBodyDto) {
    return formattedResponse({
      notes: await this.notesService.create(currentUser, createNoteBodyDto)
    })
  }

  @Get()
  async findAll(
    @CurrentUser() currentUser: TCurrentUser,
    @Query(new ZodValidationPipe(PaginationSchema(GET_NOTES_PAGINATED_FIELDS, GET_NOTES_PAGINATED_FIELDS.slice(-1)[0]))) query: TPaginationZodValDto
  ) {
    return formattedResponse({
      notes: await this.notesService.findAll(currentUser, query)
    })
  }

  @Get(':id')
  async findOne(@CurrentUser() currentUser: TCurrentUser, @Param('id') id: string) {
    return formattedResponse({
      note: await this.notesService.findOne(currentUser, id)
    })
  }

  @Patch(':id')
  async update(
    @CurrentUser() currentUser: TCurrentUser,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateNoteSchema)) updateNoteBodyDto: TUpdateNoteBodyDto
  ) {
    return formattedResponse({
      updatedData: await this.notesService.update(currentUser, id, updateNoteBodyDto)
    })
  }

  @Delete(':id')
  async remove(@CurrentUser() currentUser: TCurrentUser, @Param('id') id: string) {
    return formattedResponse({
      updatedData: await this.notesService.remove(currentUser, id)
    })
  }
}
