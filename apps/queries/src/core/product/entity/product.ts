import { z } from 'zod';

import { ReviewEntity, ReviewEntitySchema } from '../../review/entity/review';

const ID = z.string().uuid().optional();

const ImageUrl = z.string().url()
const Name = z.string().min(1).trim()
const Description = z.string().trim().optional()
const Value = z.number().or(z.string()).transform(v => Number(v))
const Reviews = z.array(ReviewEntitySchema)

const CreatedAt = z.date().or(z.string()).nullish().optional();
const UpdatedAt = z.date().or(z.string()).nullish().optional();
const DeletedAt = z.date().or(z.string()).nullish().optional();

export const ProductEntitySchema = z.object({
  id: ID,
  imageUrl: ImageUrl,
  name: Name,
  description: Description,
  value: Value,
  reviews: Reviews.optional(),
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
  deletedAt: DeletedAt,
});

type Product = z.infer<typeof ProductEntitySchema>;

export class ProductEntity {
  id!: string

  imageUrl!: string

  name!: string

  description!: string

  value!: number

  reviews?: ReviewEntity[]

  createdAt!: Date

  updatedAt!: Date

  deletedAt?: Date | null

  constructor(entity: Product) {
    Object.assign(this, ProductEntitySchema.parse(entity));
  }
}