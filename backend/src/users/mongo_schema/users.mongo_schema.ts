import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { TRBACRoles } from 'src/common/enums/roles.enums'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId

  @Prop({ required: true, trim: true })
  name: string

  @Prop({ required: true, trim: true, lowercase: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({
    type: String,
    enum: TRBACRoles,
    default: TRBACRoles.USER
  })
  role: string

  @Prop({ type: [String], default: [] })
  interests: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)

// Makes sure email is unique and maybe make login faster
UserSchema.index({ email: 1 }, { unique: true })

// should make aggregates faster
UserSchema.index({ interests: 1 })
