import { Provider } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity } from "../../core/product/entity/product";
import { IProductRepository } from "../../core/product/repository/product";
import { ProductSchema } from "../../infra/database/postgres/schemas/product";
import { ProductRepository } from "./repository";

export const ProductRepositoryProviver: Provider =
{
  provide: IProductRepository,
  useFactory: (repository: Repository<ProductSchema & ProductEntity>) => {
    return new ProductRepository(repository);
  },
  inject: [getRepositoryToken(ProductSchema)],
}
