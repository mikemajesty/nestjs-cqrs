import { z } from 'zod';
import { ReviewEntity } from '../../review/entity/review';
import { ProductEntity } from './product';

export enum DomainEvent {
  PRODUCT_CREATED = 'PRODUCT_CREATED',
  PRODUCT_UPDATED = 'PRODUCT_UPDATED',
  PRODUCT_DELETED = 'PRODUCT_DELETED',
  REVIEW_CREATED = 'REVIEW_CREATED',
}

const Event = z.nativeEnum(DomainEvent)
const Payload = z.unknown()

const EventEntitySchema = z.object({
  event: Event,
  payload: Payload
});

type Event = z.infer<typeof EventEntitySchema>;

export class EventEntity {
  event!: DomainEvent

  payload!: ProductEntity | ReviewEntity | string

  constructor(entity: Event) {
    Object.assign(this, EventEntitySchema.parse(entity));
  }
}