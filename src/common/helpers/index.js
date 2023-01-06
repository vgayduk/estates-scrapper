const firstLetterToUpperCase = string => string.charAt(0).toUpperCase() + string.slice(1);

const toTitleCase = string => firstLetterToUpperCase(string.replace(/([A-Z])/g, " $1"));

module.exports = {
  firstLetterToUpperCase,
  toTitleCase,
};
