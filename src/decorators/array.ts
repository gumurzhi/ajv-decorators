import { schemaBuilder } from '@/schemaBuilder/schema-builder';
import { AjvProperty } from '@/schemaBuilder/types/AjvProperty';
import { assertEx } from '@/helpers/commonHelper';
import { TYPES_ENUM } from '@/constants/typesEnum';

function getItemType(type: any) {
  let resultType;
  if (Array.isArray(type)) {
    resultType = { type: 'array', items: getItemType(type[0]) };
  } else if (typeof type === 'object') {
    resultType = type;
  } else if (typeof type === 'function') {
    resultType = TYPES_ENUM[type.name];
  } else {
    resultType = TYPES_ENUM[type] || { $ref: type };
  }
  return resultType;
}

function getItems(itemVariations: (NewableFunction | null | (object & { name?: string }))[]): AjvProperty {
  const arrayItemVariations = itemVariations.map(itemType => {
    assertEx(
      !Array.isArray(itemType) || (itemType as Array<string>)?.length === 1,
      `Type can't be array of several types. Check your Array definitions`,
    );
    if (typeof itemType === 'object' && (!itemType?.name || itemType?.name! === 'Object')) {
      return itemType;
    }
    const name = itemType?.name ? itemType.name : 'null';
    assertEx(!['Function', 'Object', 'Symbol'].includes(name), `Type ${name} is not acceptable as array item`);
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
