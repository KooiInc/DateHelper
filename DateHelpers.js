const { objMerge, translations } = require("./Translations");
let moduleData = { formattingRegex: null, defaultLanguage: "EN" };
const padLeft = (n, len = 2, chr = "0") => len > (`${n}`).length && `0${new Array(len - (`${n}`).length).join(chr || "0")}${n}` || n;
const dateUnits = {day: "Date", month: "Month", year: "FullYear", hour: "Hours", minute: "Minutes", second: "Seconds", ms: "Milliseconds", dow: "Day"};
const objUnits = Object.keys(dateUnits).reduce((parts, key) => objMerge(parts, {[key]: key}), {});
const dateGetOrSet = Object.entries(dateUnits)
  .map( part => ({ [part[0]]: (date, value) => date[`${value ? `set` : `get`}${part[1]}`](+value) }) )
  .reduce( (prts, part) => objMerge(prts, part), {} );
const currentDateValues = (currentXDateValue, language) => {
  let currentValues = {
    yyyy: dateGetOrSet.year(currentXDateValue), m: dateGetOrSet.month(currentXDateValue) + 1,
    d: dateGetOrSet.day(currentXDateValue), h: dateGetOrSet.hour(currentXDateValue) || Number(0),
    mi: dateGetOrSet.minute(currentXDateValue) || Number(0), s: dateGetOrSet.second(currentXDateValue) || Number(0),
    ms: dateGetOrSet.ms(currentXDateValue) || Number(0), wd: dateGetOrSet.dow(currentXDateValue) || Number(0) };
  currentValues = objMerge(currentValues, {
    mm: padLeft(currentValues.m), dd: padLeft(currentValues.d), hh: padLeft(currentValues.h), MI: padLeft(currentValues.mi),
    S: padLeft(currentValues.s), MS: padLeft(currentValues.ms, 3), M: translations.months.short[language][currentValues.m-1], 
    MM: translations.months.full[language][currentValues.m-1], dow: translations.weekdays.short[language][currentValues.wd], 
    DOW: translations.weekdays.full[language][currentValues.wd] });
  moduleData.formattingRegex = moduleData.formattingRegex
    || new RegExp("~|"+Object.keys(currentValues).reduce((p, key) => p.concat(`(\\b${key}\\b)`), []).join("|"), "g");
  return currentValues;  };
const dateSet = (date, part, val = 0) => {
  if (part === "month") { val = val > 0 && val <= 12 ? val - 1 : val < 1 ? 12 : val; }
  return dateGetOrSet[part](date.value, String(val)) && date; };
const setLanguage = (date, language = moduleData.defaultLanguage) => {date.language = language; return date;};
const format = (date, formatStr = "yyyy/mm/dd hh:mi:ss", language) => {
  const dateValueReplacements = currentDateValues(date.value, language || date.language);
  return (formatStr.replace(moduleData.formattingRegex, found => dateValueReplacements[found] || found)).split(/~/).join(""); };
const dateAdd =  (date, part, val = 0) => dateGetOrSet[part](date.value, (+val || 0) + dateGetOrSet[part](date.value)) && date;
const setValidDate = param => !isNaN(param) ? param : new Date();

module.exports = {
    dateSet: dateSet,
    dateUnits: dateUnits,
    setLanguage: setLanguage,
    format: format,
    dateAdd: dateAdd,
    setValidDate: setValidDate,
    moduleData: moduleData,
    objMerge: objMerge,
    units: objUnits
};