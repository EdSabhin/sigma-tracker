export const extractDate = (dateString) => {
  const dateParts = dateString.split("T");
  const date = dateParts[0];
  return date;
};
