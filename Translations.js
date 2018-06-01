const objMerge = (o1, ...objects) => Object.assign(o1, ...objects);
const shortenReducer = (obj, n) => (shorts, key) => objMerge(shorts, {[key]: obj[key].map(v => `${v.substr(0,n)}`)});
const stringValues = (obj, shortenTo) => ({
  full: obj,
  short: Object.keys(obj).reduce(shortenReducer(obj, shortenTo), {})
});
const translations = {
  weekdays: stringValues({
    NL: "Zondag Maandag Dinsdag Woensdag Donderdag Vrijdag Zaterdag".split(" "),
    EN: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
    DE: "Sontag Montag Dienstag Mittwoch Donnertag Freitag Samstag".split(" "),
    FR: "Dimanche Lundi Mardi Mercredi Jeudi Vendredi Samedi".split(" ")
  }, 3),
  months: stringValues({
    NL: "Januari Februari Maart April Mei Juni Juli Augustus September Oktober November December".split(" "),
    EN: "January February March April May June July August September October November December".split(" "),
    DE: "Januar Februar März April Mai Juni Juli August September Oktober November Dezember".split(" "),
    FR: "Janvier Février Mars Avril Mai Juin Juillet Aôut Septembre Octobre Novembre Décembre".split(" ")
  }, 3)
};

module.exports = {
  objMerge: objMerge,
  translations: translations
};