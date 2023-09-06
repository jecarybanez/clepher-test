export function convertToDate(string = "") {
  const dateYear = string.substr(0, 4);
  const dateMonth = string.substr(4, 2);
  const dateDay = string.substr(6, 2);
  const dateHour = string.substr(9, 2);
  const dateMin = string.substr(11, 2);
  const dateSec = string.substr(13, 2);

  return new Date(dateYear, dateMonth, dateDay, dateHour, dateMin, dateSec);
}
