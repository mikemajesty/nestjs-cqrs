import { z } from 'zod';

import { ProductEntity } from '../../product/entity/product';

const ID = z.string().uuid().optional();

const User = z.string().min(1).trim()
const Rating = z.number().min(0).max(5)
const Product = z.unknown()

const CreatedAt = z.date().or(z.string()).nullish().optional().optional();
const UpdatedAt = z.date().or(z.string()).nullish().optional();
const DeletedAt = z.date().or(z.string()).nullish().optional();

export const ReviewEntitySchema = z.object({
  id: ID,
  user: User,
  rating: Rating,
  product: Product,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
  deletedAt: DeletedAt,
});

type Review = z.infer<typeof ReviewEntitySchema>;

export class ReviewEntity {

  user!: string

  rating!: number

  product!: ProductEntity

  createdAt!: Date

  updatedAt!: Date

  deletedAt?: Date | null

  constructor(entity: Review) {
    Object.assign(this, ReviewEntitySchema.parse(entity));
  }
}