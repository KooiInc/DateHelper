module.exports = (() => {
  return {
    dateISO: (separator = "-") => `yyyy${separator}mm${separator}dd`,
    dateMonthFullEN: "MM d yyyy",
    dateMonthFull: "d MM yyyy",
    dateMonthWeekDayFullEN: "DOW MM d yyyy",
    dateMonthWeekDayFull: "DOW d MM yyyy",
    dateMonthFullWeekDayShortEN: "dow MM d yyyy",
    dateMonthFullWeekDayShort: "dow d MM yyyy",
    dateTimeISOFull: (separator = "-") => `yyyy${separator}mm${separator}dd hh:MI:S.MS`,
    dateTimeISOSeconds: (separator = "-") => `yyyy${separator}mm${separator}dd hh:MI:S`,
    dateTimeISO: (separator = "-") => `yyyy${separator}mm${separator}dd hh:MI`,
    dateTimeMonthFullWeekDayShortEN: "dow MM d yyyy hh:MI",
    dateTimeMonthFullWeekDayShort: "dow d MM yyyy hh:MI",
    dateTimeMonthFullEN: "MM d yyyy hh:MI",
    dateTimeMonthFull: "d MM yyyy hh:MI",
    dateTimeMonthWeekDayFullEN: "DOW MM d yyyy hh:MI",
    dateTimeMonthShortWeekDayFull: "DOW dd M d yyyy hh:MI",
    dateTimeMonthWeekDayShortEN: "dow M d yyyy hh:MI",
    dateTimeMonthShortWeekDayShort: "dow d M yyyy hh:MI",
  }
})();