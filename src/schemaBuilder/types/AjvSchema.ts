import { PropertyItem } from '@/schemaBuilder/types/PropertyItem';
import { IfType } from '@/schemaBuilder/types/IfType';
import { ThenType } from '@/schemaBuilder/types/ThenType';

export class AjvSchema {
  public '$id': string;

  public 'type': 'object';

  public 'properties': PropertyItem;

  public 'required'?: string[];

  public 'if'?: IfType;

  public 'then'?: ThenType;
}
