module.exports = {
    // ISO
    dateISO: (separator = "-") => `yyyy${separator}mm${separator}dd`,
    dateTimeISOFull: (separator = "-") => `yyyy${separator}mm${separator}dd hh:MI:S.MS`,
    dateTimeISOFullZulu: (separator = "-") => `yyyy${separator}mm${separator}dd~T~hh:MI:S.MS~Z`,
    dateTimeISOSeconds: (separator = "-") => `yyyy${separator}mm${separator}dd hh:MI:S`,
    dateTimeISO: (separator = "-") => `yyyy${separator}mm${separator}dd hh:MI`,
    // EN
    dateMonthFullEN: "MM d yyyy",
    dateMonthWeekDayFullEN: "DOW MM d yyyy",
    dateMonthFullWeekDayShortEN: "dow MM d yyyy",
    dateTimeMonthFullWeekDayShortEN: "dow MM d yyyy hh:MI",
    dateTimeMonthFullEN: "MM d yyyy hh:MI",
    dateTimeMonthWeekDayFullEN: "DOW MM d yyyy hh:MI",
    dateTimeMonthWeekDayShortEN: "dow M d yyyy hh:MI",
    // Rest of the world
    dateMonthFull: "d MM yyyy",
    dateMonthWeekDayFull: "DOW d MM yyyy",
    dateMonthFullWeekDayShort: "dow d MM yyyy",
    dateTimeMonthFullWeekDayShort: "dow d MM yyyy hh:MI",
    dateTimeMonthFull: "d MM yyyy hh:MI",
    dateTimeMonthShortWeekDayFull: "DOW dd M d yyyy hh:MI",
    dateTimeMonthShortWeekDayShort: "dow d M yyyy hh:MI",
};