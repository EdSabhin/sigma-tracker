export const capitalize = (string) => {
  let words = string.split(" ");

  let capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  let capitalized = capitalizedWords.join(" ");

  return capitalized;
}
