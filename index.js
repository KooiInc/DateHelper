const {
  dateAdd,
  dateSet,
  setLanguage,
  format,
  units,  
  setValidDate,
  moduleData,
} = require("./DateHelpers");

function Instance(date, language) {
  this.value = date;
  this.language = language;
} 

Instance.prototype = {
  add(val, unit = units.day) { return dateAdd(this, unit, val); },
  setUnit(val, unit) { return dateSet(this, unit, val); },
  setLanguage(language) { return setLanguage(this, language); },
  format(formatStr, language) {return format(this, formatStr, language); },
  units: units,
};

module.exports = {
  formatStrings: require("./Formats"),
  XDate: (someDate, language = moduleData.defaultLanguage) =>
      new Instance(setValidDate(someDate), language),
};