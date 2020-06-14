import { PropertyItem } from '@/schemaBuilder/types/property-item';
import { IfType } from '@/schemaBuilder/types/if-type';
import { ThenType } from '@/schemaBuilder/types/then-type';

export class AjvSchema {
  public '$id': string;

  public 'type': 'object';

  public 'properties': PropertyItem;

  public 'required'?: string[];

  public 'if'?: IfType;

  public 'then'?: ThenType;

  public 'allOf'?: { if: IfType; then: ThenType }[];
}
