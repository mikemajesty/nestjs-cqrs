import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  autoIndex: true,
  timestamps: true,
})
export class Review {
  @Prop({ type: String })
  _id!: string;

  @Prop({ type: Number })
  rating!: number;

  @Prop({ type: String })
  user!: number;

  @Prop({ type: Date })
  createdAt!: Date;

  @Prop({ type: Date })
  updatedAt!: Date;

  @Prop({ type: Date, default: null })
  deletedAt!: Date;
}