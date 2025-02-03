import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  Relation,
  UpdateDateColumn
} from 'typeorm';
import { ProductSchema } from './product';

@Entity({ name: 'reviews' })
export class ReviewSchema extends BaseEntity {
  @Column({ type: 'uuid', primary: true })
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => ProductSchema, (product) => product.reviews, { onDelete: 'CASCADE' })
  product!: Relation<ProductSchema>;

  @DeleteDateColumn({ nullable: true })
  deletedAt!: Date;
}
