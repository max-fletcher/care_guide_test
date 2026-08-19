import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostSchema, type TCreatePostBodyDto } from './validators/create-post.schema'
import { ZodValidationPipe } from 'src/common/pipes/zod-validate.pipes'
import { formattedResponse } from 'src/common/utils/formatters/responses.formatter'
import { PaginationSchema, type TPaginationZodValDto } from 'src/common/validators/pagination.schema'
import { GET_POSTS_PAGINATED_FIELDS } from './enums/pagination.enums'
import { type TUpdatePostBodyDto, UpdatePostSchema } from './validators/update-post.schema'
import { JwtAuthGuard } from 'src/common/guards/access-token.guard'

@UseGuards(JwtAuthGuard)
@Controller({ path: 'posts', version: '1' })
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(new ZodValidationPipe(CreatePostSchema)) createPostBodyDto: TCreatePostBodyDto) {
    return formattedResponse({
      post: await this.postsService.create(createPostBodyDto)
    })
  }

  @Get()
  async findAll(
    @Query(new ZodValidationPipe(PaginationSchema(GET_POSTS_PAGINATED_FIELDS, GET_POSTS_PAGINATED_FIELDS.slice(-1)[0]))) query: TPaginationZodValDto
  ) {
    return formattedResponse({
      posts: await this.postsService.findAll(query)
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return formattedResponse({
      post: await this.postsService.findOne(id)
    })
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body(new ZodValidationPipe(UpdatePostSchema)) updatePostBodyDto: TUpdatePostBodyDto) {
    return formattedResponse({
      updatedData: await this.postsService.update(id, updatePostBodyDto)
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return formattedResponse({
      updatedData: await this.postsService.remove(id)
    })
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    const data = await this.postsService.findByUser(userId)
    console.log('data', data)

    return formattedResponse({
      userPosts: data
    })
  }
}
