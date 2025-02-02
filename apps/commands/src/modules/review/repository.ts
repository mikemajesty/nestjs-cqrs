import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { TypeORMRepository } from '@/infra/repository/postgres/repository';
import { ReviewEntity } from '../../core/review/entity/review';
import { IReviewRepository } from '../../core/review/repository/review';
import { ReviewSchema } from '../../infra/database/postgres/schemas/review';

@Injectable()
export class ReviewRepository extends TypeORMRepository<Model> implements IReviewRepository {
  constructor(readonly repository: Repository<Model>) {
    super(repository);
  }
}

type Model = ReviewSchema & ReviewEntity;