import { IRepository } from '@/infra/repository/adapter';

import { ReviewEntity } from '../entity/review';

export abstract class IReviewRepository extends IRepository<ReviewEntity> {}