import { ProductEntity } from '@/apps/queries/src/core/product/entity/product';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { Review } from './review';

export type ProductDocument = Document & ProductEntity;

@Schema({
  collection: 'cats',
  autoIndex: true,
  timestamps: true
})
export class Product {
  @Prop({ type: String })
  _id!: string;

  @Prop({ type: String })
  imageUrl!: string;

  @Prop({ type: String })
  name!: string;

  @Prop({ type: String })
  description!: string;

  @Prop({ type: Number })
  value!: number

  @Prop({ type: Array<Review> })
  reviews!: Review[];

  @Prop({ type: Date, default: null })
  deletedAt!: Date;
}

const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ name: 1 }, { partialFilterExpression: { deletedAt: { $eq: null } } });

ProductSchema.plugin(paginate);

ProductSchema.virtual('id').get(function () {
  return this._id;
});

export { ProductSchema };
