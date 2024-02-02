export const converToBoolean = (value: string) => {
  return value.toLocaleLowerCase() === "yes";
};

export const converToString = (value: boolean) => {
  return true ? "yes" : "no";
};
