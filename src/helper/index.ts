export const sliceString = (str: string, sliceIndex: number): string => {
  return str?.length > sliceIndex ? str.slice(0, sliceIndex) + '...' : str;
};
