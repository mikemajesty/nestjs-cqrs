import { Provider } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReviewEntity } from "../../core/review/entity/review";
import { IReviewRepository } from "../../core/review/repository/review";
import { ReviewSchema } from "../../infra/database/postgres/schemas/review";
import { ReviewRepository } from "./repository";

export const ReviewRepositoryProviver: Provider =
{
  provide: IReviewRepository,
  useFactory: (repository: Repository<ReviewSchema & ReviewEntity>) => {
    return new ReviewRepository(repository);
  },
  inject: [getRepositoryToken(ReviewSchema)],
}
