module.exports.XDate = ( () => {
  const { dateSet, dateUnits, setLanguage, format, dateAdd, setValidDate, moduleData, objMerge, units } = require("./DateHelpers");
  
  const Create = dateObj => objMerge(dateObj, {
      add: (val, unit) => dateAdd(dateObj, unit, val),
      setUnit: (val, unit) => dateSet(dateObj, unit, val),
      setLanguage: language => setLanguage(dateObj, language),
      format: (formatStr, language) => format(dateObj, formatStr, language),
      units: units,
    });

  return (someDate, language = moduleData.defaultLanguage) =>
    Create({ value: setValidDate(someDate ? new Date(someDate) : new Date()), language: language });
} )();