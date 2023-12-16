import { extractDate } from "./extractDate";

export const formatChange = (key, value, valueToFormat) => {
  if (key === valueToFormat) {
    console.log(extractDate(value));
    return extractDate(value);
  } else {
    return value;
  }
};
