import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { Model } from './Model';

@Entity()
@ObjectType()
export class Subscription extends Model {}
