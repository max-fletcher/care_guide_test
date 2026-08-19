import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type NoteDocument = Note & Document

@Schema({ timestamps: true })
export class Note {
  _id: Types.ObjectId

  @Prop({ required: true, trim: true })
  title: string

  @Prop({ default: '' })
  content: string

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId
}

export const NoteSchema = SchemaFactory.createForClass(Note)

// Compound index. Sorted by createdAt so latest shows first, and since it will be viewed by the user,
// owner: 1 makes it faster
NoteSchema.index({ owner: 1, createdAt: -1 })

// Compound index. For admin only. Sorted by createdAt so latest shows first.
NoteSchema.index({ createdAt: -1 })
