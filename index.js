module.exports.XDate = ( () => {
  const { dateSet, parts, setLanguage, format, dateAdd, setValidDate, moduleData, objMerge, partsHelper } = require("./DateHelpers");
  
  const Create = dateObj => objMerge(dateObj, {
      add: (val, datePart) => dateAdd(dateObj, datePart, val),
      setPart: (val, datePart) => dateSet(dateObj, datePart, val),
      setLanguage: language => setLanguage(dateObj, language),
      format: (formatStr, language) => format(dateObj, formatStr, language),
      parts: partsHelper,
    });

  return (someDate, language = moduleData.defaultLanguage) =>
    Create({ value: setValidDate(someDate ? new Date(someDate) : new Date()), language: language });
} )();