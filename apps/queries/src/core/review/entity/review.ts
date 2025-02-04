import { ProductEntity } from '@/apps/commands/src/core/product/entity/product';
import { z } from 'zod';


const ID = z.string().uuid().optional();

const User = z.string().min(1).trim()
const Rating = z.number().min(0).max(5)
const Product = z.string().uuid().or(z.any())

const CreatedAt = z.date().or(z.string()).nullish().optional().optional();
const UpdatedAt = z.date().or(z.string()).nullish().optional();
const DeletedAt = z.date().or(z.string()).nullish().optional();

export const ReviewEntitySchema = z.object({
  id: ID,
  user: User,
  rating: Rating,
  productId: Product,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
  deletedAt: DeletedAt,
});

type Review = z.infer<typeof ReviewEntitySchema>;

export class ReviewEntity {
  user!: string

  rating!: number

  productId!: string | ProductEntity

  createdAt!: Date

  updatedAt!: Date

  deletedAt?: Date | null

  constructor(entity: Review) {
    Object.assign(this, ReviewEntitySchema.parse(entity));
  }
}