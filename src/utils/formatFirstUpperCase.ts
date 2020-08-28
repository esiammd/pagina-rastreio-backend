function formatFirstUpperCase(text: string, separator = " ") {
  const firstUpperCase = text
    .split(separator)
    .map((word) => {
      if (
        word !== "de" &&
        word !== "do" &&
        word !== "da" &&
        word !== "dos" &&
        word !== "das" &&
        word !== "em" &&
        word !== "com" &&
        word !== "para" &&
        word !== "/"
      ) {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
      }
      return word;
    })
    .join(separator);

  return firstUpperCase;
}

export default formatFirstUpperCase;
