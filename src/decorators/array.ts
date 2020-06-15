import { schemaBuilder } from '@/schemaBuilder/schema-builder';
import { AjvProperty } from '@/schemaBuilder/types/AjvProperty';
import { assertEx } from '@/helpers/commonHelper';
import { TYPES_ENUM } from '@/constants/typesEnum';

function getItemType(type: string) {
  if (typeof type === 'object') {
    return type;
  }
  return TYPES_ENUM[type] || { $ref: [type] };
}

function getItems(itemVariations: (NewableFunction | null | (object & { name?: string }))[]): AjvProperty {
  const arrayItemVariations = itemVariations.map(itemType => {
    if (typeof itemType === 'object' && (!itemType?.name || itemType?.name! === 'Object')) {
      return itemType;
    }
    const name = itemType?.name ? itemType.name : 'null';
    assertEx(!['Function', 'Object', 'Array', 'Symbol'].includes(name), `Type ${name} is not acceptable as array item`);
    return name;
  });
  return arrayItemVariations.length === 1
    ? getItemType(arrayItemVariations[0] as string)
    : { anyOf: arrayItemVariations.map(name => getItemType(name as string)) };
}

export function IsArray(...variableTypes: (NewableFunction | null)[] | object[]) {
  return function(target: any, key: string) {
    schemaBuilder.pushProperty(target.constructor.name, key, {
      type: 'array',
      items: getItems(variableTypes),
    });
  };
}
