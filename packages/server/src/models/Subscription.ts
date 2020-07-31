import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { Model } from './Model';

/**
 * ARCH of this
 * S -> subscription (this file)
 * ST -> subscription type
 * SI -> subscription item
 * SII -> subscription item item (thingy connecting subscription items to subscriptions)
 * SU -> shipping update
ST1 - 3month - KS
  -> si1
    -> p1
    -> p2
  -> si2
    -> p3
  -> si3
    -> p4
ST2
  -> si4
    -> p1
  -> si5
    -> p3

S1 -> ST1
  -> sii1 -> si1
    -> su1
    -> su2
  -> sii2 -> si2
  -> sii3 -> si3
S2 -> ST2
  -> sii4 -> si4
    -> su3
  -> sii5 -> si5
S3 -> ST1
  -> sii6 -> si1
  -> sii7 -> si2
  -> sii8 -> si3
*/

// @Entity()
// @ObjectType()
export class Subscription extends Model {}
