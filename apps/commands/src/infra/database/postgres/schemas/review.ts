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

  @Column({ type: 'int' })
  rating!: number;

  @Column({ type: 'varchar' })
  user!: number;

  @ManyToOne(() => ProductSchema, (product) => product.reviews, { onDelete: 'CASCADE' })
  product!: Relation<ProductSchema>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt!: Date;
}
