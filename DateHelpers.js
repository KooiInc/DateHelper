const {
  objMerge,
  translations
} = require("./Translations");
let moduleData = {
  formattingRegex: /(\byyyy\b)|(\bm\b)|(\bd\b)|(\bh\b)|(\bmi\b)|(\bs\b)|(\bms\b)|(\bwd\b)|(\bmm\b)|(\bdd\b)|(\bhh\b)|(\bMI\b)|(\bS\b)|(\bMS\b)|(\bM\b)|(\bMM\b)|(\bdow\b)|(\bDOW\b)/g,
  defaultLanguage: "EN"
};
const padLeft = (n, len = 2, chr = "0") => len > (`${n}`).length && `0${new Array(len - (`${n}`).length).join(chr || "0")}${n}` || n;
const dateUnits = {
  day: "Date",
  month: "Month",
  year: "FullYear",
  hour: "Hours",
  minute: "Minutes",
  second: "Seconds",
  ms: "Milliseconds",
  dow: "Day"
};
const objUnits = Object.keys(dateUnits).reduce((parts, key) => objMerge(parts, {
  [key]: key
}), {});
const dateGetOrSet = Object.entries(dateUnits)
  .map(part => ({
    [part[0]]: (date, value) => date[`${value ? `set` : `get`}${part[1]}`](+value)
  }))
  .reduce((prts, part) => objMerge(prts, part), {});
const currentDateValues = (currentXDateValue, language = moduleData.defaultLanguage) => {
  let currentValues = {
    yyyy: dateGetOrSet.year(currentXDateValue),
    m: dateGetOrSet.month(currentXDateValue) + 1,
    d: dateGetOrSet.day(currentXDateValue),
    h: dateGetOrSet.hour(currentXDateValue) || Number(0),
    mi: dateGetOrSet.minute(currentXDateValue) || Number(0),
    s: dateGetOrSet.second(currentXDateValue) || Number(0),
    ms: dateGetOrSet.ms(currentXDateValue) || Number(0),
    wd: dateGetOrSet.dow(currentXDateValue) || Number(0)
  };
  currentValues = objMerge(currentValues, {
    mm: padLeft(currentValues.m),
    dd: padLeft(currentValues.d),
    hh: padLeft(currentValues.h),
    MI: padLeft(currentValues.mi),
    S: padLeft(currentValues.s),
    MS: padLeft(currentValues.ms, 3),
    M: translations.months.short[language][currentValues.m - 1],
    MM: translations.months.full[language][currentValues.m - 1],
    dow: translations.weekdays.short[language][currentValues.wd],
    DOW: translations.weekdays.full[language][currentValues.wd]
  });
  return currentValues;
};
const setFormattingRegex = () => 
  new RegExp(Object.keys(currentValues(new Date(), moduleData.defaultLanguage))
    .reduce((p, key) => p.concat(`(\\b${key}\\b)`), []).join("|"), "g");
const dateSet = (date, part, val) => {
  const setMonthValue = val => val < 1 || !val ? 12 : val - 1;
  val = +val;
  val = isNaN(val) || val < 0
    ? null
    : String(val && part === objUnits.month && val ? setMonthValue(val) : val || dateGetOrSet[part](date.value));
  return dateGetOrSet[part](date.value, val) && date;
};
const setLanguage = (date, language = moduleData.defaultLanguage) => (date.language = language) && date;
const format = (date, formatStr = "yyyy/mm/dd hh:mi:ss", language) => {
  const dateValueReplacements = currentDateValues(date.value, language || date.language);
  return (formatStr.replace(moduleData.formattingRegex, found => dateValueReplacements[found] || found)).split(/~/).join("");
};
const dateAdd = (date, part, val = 0) => dateGetOrSet[part](date.value, (+val || 0) + dateGetOrSet[part](date.value)) && date;
const setValidDate = param => {

  if (param && param.constructor === String && param.split(/[-/]/).length < 3) {
    param = undefined;
  }
  const tryDate = (param && new Date(param)) || NaN;
  return !isNaN(tryDate) ? tryDate : new Date();
}

module.exports = {
  moduleData: moduleData,
  dateSet: dateSet,
  currentDateValues,
  dateUnits: dateUnits,
  setLanguage: setLanguage,
  format: format,
  dateAdd: dateAdd,
  setValidDate: setValidDate,
  objMerge: objMerge,
  units: objUnits,
};