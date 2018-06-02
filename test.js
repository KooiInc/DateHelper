process.env.TZ = "UTC";
const { XDate } = require("./");
const chai = require("chai");
const assert = chai["assert"];
const expect = chai["expect"];

const tests = allTests();
describe("DateHelper", () => {
  describe("√ General/approval", () => {
    it("Can create an extended Date", tests.createdValue);
    it("Methods approval", tests.methodsApproval);
    it("Properties approval", tests.propsApproval);
    it("Leftpad values", tests.leftPadding);
  });
  describe("√ Formatting", () => {
    it("Format [yyyy-mm-dd hh:MI]", tests.canFormatDefault);
    it("Format string within formatting [yyyy-mm-dd~T~hh:MI:S:MS~Z]", tests.canFormatDefaultWithStrings);
    it("Format english month string (long)", tests.formatENMonthLong);
    it("Format english month string (short)", tests.formatENMonthShort);
    it("Format english weekday string (long)", tests.formatENWeekLong);
    it("Format english weekday string (short)", tests.formatENWeekShort);
    it("Format dutch month string (long)", tests.formatNLMonthLong);
    it("Format dutch month string (short)", tests.formatNLMonthShort);
    it("Format dutch weekday string (long)", tests.formatNLWeekLong);
    it("Format dutch weekday string (short)", tests.formatNLWeekShort);
    it("Format french month string (long)", tests.formatFRMonthLong);
    it("Format french month string (short)", tests.formatFRMonthShort);
    it("Format french weekday string (long)", tests.formatFRWeekLong);
    it("Format french weekday string (short)", tests.formatFRWeekShort);
    it("Format german month string (long)", tests.formatDEMonthLong);
    it("Format german month string (short)", tests.formatDEMonthShort);
    it("Format german weekday string (long)", tests.formatDEWeekLong);
    it("Format german weekday string (short)", tests.formatDEWeekShort);
  });
  describe("√ Arithmetic", () => {
    it("No value change adding (invalid value) 'five'", tests.addSubtractInvalidStringParameterDoesNotChangeDate);
    it("Add months", tests.canAddMonth);
    it("Subtract months", tests.canSubtractMonth);
    it("Add years", tests.canAddYear);
    it("Subtract years", tests.canSubtractYear);
    it("Add days", tests.canAddDay);
    it("Subtract days", tests.canSubtractDay);
    it("Add hours", tests.canAddHours);
    it("Subtract hours", tests.canSubtractHours);
    it("Add minutes", tests.canAddMinutes);
    it("Subtract minutes", tests.canSubtractMinutes);
    it("Add seconds", tests.canAddSeconds);
    it("Subtract seconds", tests.canSubtractSeconds);
    it("Month change adding more days then contained by month", tests.canAddDaysOverMonth);
    it("Month change after subtracting more days then current date", tests.canSubtractDaysOverMonth);
    it("Date changes after subtracting minutes from 00:00h", tests.canSubtractMinutesOverDate);
    it("Add 1 day on feb 28 of a leap year", tests.leapYearFebruary28Add1);
    it("Add 1 day on feb 28 of a non leap year", tests.nonLeapYearFebruary28Add1);
  });
});

function allTests() {
  const now = XDate();
  const fixed = XDate("2018/07/11");
  const fixedEN = XDate(fixed.value, "EN");
  const fixedNL = XDate(fixed.value, "NL");
  const fixedFR = XDate(fixed.value, "FR");
  const fixedDE = XDate(fixed.value, "DE");
  const units = now.units;
  return {
    createdValue: () => {
      const nowPlain = new Date();
      assert.equal(now.format("yyyy/m/d"), [nowPlain.getFullYear(), nowPlain.getMonth() + 1, nowPlain.getDate()].join("/"))
    },
    methodsApproval: () => {
      const methods = Object.keys(now).filter(k => now[k] instanceof Function).sort().toString();
      assert.equal(methods, "add,format,setLanguage,setPart");
    },
    propsApproval: () => {
      const props = Object.keys(now).filter(k => !(now[k] instanceof Function)).sort().toString();
      assert.equal(props, "language,units,value");
    },
    canFormatDefault: () => assert.equal(fixed.format("yyyy-mm-dd hh:MI"), "2018-07-11 00:00"),
    canFormatDefaultWithStrings: () => assert.equal(fixed.format("yyyy-mm-dd~T~hh:MI:S:MS~Z"), "2018-07-11T00:00:00:000Z"),
    formatENMonthLong: () => assert.equal(fixedEN.format("MM"), "July"),
    formatENMonthShort: () => assert.equal(fixedEN.format("M"), "Jul"),
    formatENWeekLong: () => assert.equal(fixedEN.format("DOW"), "Wednesday"),
    formatENWeekShort: () => assert.equal(fixedEN.format("dow"), "Wed"),
    formatNLMonthLong: () => assert.equal(fixedNL.format("MM"), "Juli"),
    formatNLMonthShort: () => assert.equal(fixedNL.format("M"), "Jul"),
    formatNLWeekLong: () => assert.equal(fixedNL.format("DOW"), "Woensdag"),
    formatNLWeekShort: () => assert.equal(fixedNL.format("DOW"), "Woensdag"),
    formatFRMonthLong: () => assert.equal(fixedFR.format("MM"), "Juillet"),
    formatFRMonthShort: () => assert.equal(fixedFR.format("M"), "Jui"),
    formatFRWeekLong: () => assert.equal(fixedFR.format("DOW"), "Mercredi"),
    formatFRWeekShort: () => assert.equal(fixedFR.format("dow"), "Mer"),
    formatDEMonthLong: () => assert.equal(fixedDE.format("MM"), "Juli"),
    formatDEMonthShort: () => assert.equal(fixedDE.format("M"), "Jul"),
    formatDEWeekLong: () => assert.equal(fixedDE.format("DOW"), "Mittwoch"),
    formatDEWeekShort: () => assert.equal(fixedDE.format("dow"), "Mit"),
    leftPadding: () => {
      assert.equal(XDate(fixed.value).add(15, units.ms).format("MS"), "015");
      assert.equal(XDate(fixed.value).add(15, units.ms).format("mm"), "07");
    },
    canAddMonth: () => assert.equal(+XDate(fixed.value).add(15, units.month).format("m"), 10),
    canSubtractMonth: () => assert.equal(+XDate(fixed.value).add(-5, units.month).format("m"), 2),
    canAddYear: () => assert.equal(+XDate(now.value).add(15, units.year).format("yyyy"), new Date().getFullYear() + 15),
    canSubtractYear: () => assert.equal(+XDate(now.value).add(-5, units.year).format("yyyy"), new Date().getFullYear() - 5),
    canAddDay: () => assert.equal(+XDate(now.value).add(15, units.day).format("d"), new Date().getDate() + 15),
    canSubtractDay: () => assert.equal(+XDate(fixed.value).add(-5, units.day).format("d"), 6),
    canAddDaysOverMonth: () => {
      const x = XDate(fixed.value);
      assert.equal(x.add(33, units.day).format("m"), 8);
      assert.equal(x.format("d"), 13);
    },
    canSubtractDaysOverMonth: () => assert.equal(+XDate(fixed.value).add(-15, units.day).format("m"), 6),
    canSubtractMinutesOverDate: () => assert.equal(+XDate(fixed.value).add(-15, units.minute).format("d"), 10),
    canAddHours: () => assert.equal(+XDate(fixed.value).add(15, units.hour).format("h"), 15),
    canSubtractHours: () => assert.equal(+XDate(fixed.value).add(-15, units.hour).format("h"), 9),
    canAddMinutes: () => assert.equal(+XDate(fixed.value).add(15, units.minute).format("mi"), 15),
    canSubtractMinutes: () => assert.equal(+XDate(fixed.value).add(-15, units.minute).format("mi"), 45),
    canAddSeconds: () => assert.equal(+XDate(fixed.value).add(15, units.second).format("s"), 15),
    canSubtractSeconds: () => assert.equal(+XDate(fixed.value).add(-15, units.second).format("s"), 45),
    addSubtractInvalidStringParameterDoesNotChangeDate: () => {
      const x = XDate(fixed.value);
      const value = x.value;
      assert.equal(x.add("five", units.day).value, value);
    },
    leapYearFebruary28Add1: () => assert.equal(XDate("2000/02/28").add(1, units.day).value.getDate(), 29),
    nonLeapYearFebruary28Add1: () => {
      const x = XDate("2001/02/28");
      assert.equal(x.add(1, units.day).value.getDate(), 1);
      assert.equal(x.value.getMonth(), 2);
    },
  };
}