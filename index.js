module.exports = {
  XDate: (() => {
    const {
      dateSet,
      dateUnits,
      setLanguage,
      format,
      dateAdd,
      setValidDate,
      moduleData,
      objMerge,
      units
    } = require("./DateHelpers");

    function XDateCtor(date, language) {
      this.value = date;
      this.language = language;
    } 

    XDateCtor.prototype = {
      add(val, unit = units.day) { return dateAdd(this, unit, val); },
      setUnit(val, unit) { return dateSet(this, unit, val); },
      setLanguage(language) { return setLanguage(this, language); },
      format(formatStr, language) {return format(this, formatStr, language); },
      units: units,
    };

    return (someDate, language = moduleData.defaultLanguage) =>
      new XDateCtor(setValidDate(someDate ? new Date(someDate) : new Date()), language);
  })(),
  formatStrings: require("./Formats"),
};