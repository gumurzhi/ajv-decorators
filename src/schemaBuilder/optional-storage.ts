export const optionalPropertyStorage: { [className: string]: string[] } = {};
export const addOptional = (
  className: string,
  optionalPropertyName: string,
): void => {
  if (!optionalPropertyStorage[className]) {
    optionalPropertyStorage[className] = [optionalPropertyName];
    return;
  }
  optionalPropertyStorage[className].push(optionalPropertyName);
};
