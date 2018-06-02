module.exports = (() => {
  return {
    dateISO: (separator = "-") => `yyyy${separator}mm${separator}dd`,
    dateMonthFullEN: "MM dd yyyy",
    dateMonthFull: "dd MM yyyy",
    dateMonthWeekDayFullEN: "DOW MM dd yyyy",
    dateMonthWeekDayFull: "DOW dd MM yyyy",
    dateMonthFullWeekDayShortEN: "dow MM dd yyyy",
    dateMonthFullWeekDayShort: "dow dd MM yyyy",
    dateTimeISOFull: (separator = "-") => `yyyy${separator}mm${separator}dd mm:hh:S.MS`,
    dateTimeISOSeconds: (separator = "-") => `yyyy${separator}mm${separator}dd mm:hh:S`,
    dateTimeISO: (separator = "-") => `yyyy${separator}mm${separator}dd mm:hh`,
    dateTimeMonthFullWeekDayShortEN: "dow MM dd yyyy mm:hh",
    dateTimeMonthFullWeekDayShort: "dow dd MM dd yyyy mm:hh",
    dateTimeMonthFullEN: "MM dd yyyy mm:hh",
    dateTimeMonthFull: "dd MM yyyy mm:hh",
    dateTimeMonthWeekDayFullEN: "DOW MM dd yyyy mm:hh",
    dateTimeMonthShortWeekDayFull: "DOW dd M dd yyyy mm:hh",
    dateTimeMonthWeekDayShortEN: "dow M dd yyyy mm:hh",
    dateTimeMonthShortWeekDayShort: "dow dd M dd yyyy mm:hh",
  }
})();