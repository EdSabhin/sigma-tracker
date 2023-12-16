import { capitalize } from "./capitalize";

export const formatText = (text) => {
  const spacedText = text.replace(/_/g, " ");
  const capitalized = capitalize(spacedText);
  return capitalized;
};
