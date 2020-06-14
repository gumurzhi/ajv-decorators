export const assertEx = (condition: any, errorMessage: string): void => {
  if (!condition) {
    throw new Error(errorMessage);
  }
};
