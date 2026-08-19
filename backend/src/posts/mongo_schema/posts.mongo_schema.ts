import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type PostDocument = Post & Document

@Schema({ timestamps: true })
export class Post {
  _id: Types.ObjectId

  @Prop({ required: true, trim: true })
  title: string

  @Prop({ required: true, trim: true })
  content: string

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId
}

export const PostSchema = SchemaFactory.createForClass(Post)

// compound index. Needed for speeding up scenario 2.
PostSchema.index({ author: 1, createdAt: -1 })
