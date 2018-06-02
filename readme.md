# DateExtension
A simple module to format a Date and do some arithmetic on it.

## Usage
Use `npm install dateextension`.
Or download files to your computer. After downloading 
within the download directory, open a cmd window and start `npm install`.

Now you can start an instance using

```javascript
const { XDate } = require("[path.to]DateExtension");
const now = XDate();
// etc.
```
# Available methods
## add

**Parameters** `value = 0, unit`

**It** adds [value] [unit(s)] to the date and returns the XDate Object

`unit` is a string. An XDate instance contains unit-properties you can use (see example).

Possible unit values: 
- "day" 
- "month" 
- "year" 
- "hour" 
- "minute" 
- "second" 
- "ms"

Example

```javascript
const now = XDate();
now.add(1, "day"); // add 1 day
now.add(-15, now.units.hour); // subtract 15 hours
```
Returns `XDate instance`

## format

**Parameters** `formattingstring`, `language`

**It** serializes the XDate instance to a localized ([language]) string using [formattingstring].

Returns `String`

Value replacements for an XDate instance in a formattingstring:
- "yyyy" => (int) the full year
- "m" => (int) the month (real month, not the array value of getMonth()),
- "d" => (int) the date
- "h" => (int) the hours
- "mi" => (int) the minutes
- "s" => (int) the seconds,
- "ms" => (int) the milliseconds,
- "wd" => (int) the day of the week,
- "mm" => (string) zero padded (real) month
- "dd" => (string) zero padded date
- "hh" => (string) zero padded hours
- "MI" => (string) zero padded minutes
- "S" => (string) zero padded seconds
- "MS" => (string) zero padded milliseconds
- "M" => (string) short month string (language dependent)
- "MM" => (string) long month string (language dependent)
- "dow" => (string) short day of week string (language dependent)
- "DOW" => (string) long day of week string (language dependent)

**Example**

```javascript
const someDate = XDate("2015/03/15 22:18");
someDate.format("DOW d MM yyyy hh:MI", "FR"); // "Dimanche 15 Mars 2015 22:18"
```

If string should be included in the formatted date, you can use ~ (tilde), e.g.

```javascript
const someDate = XDate("2015/03/15 22:18:03.022");
someDate.format("yyyy/mm/dd~T~hh:MI:S.MS~Z"); // "2015/03/15T22:18:03.022Z"
```

## setLanguage

**Parameters** `language`

**It** sets the formatting language of an XDate instance

Returns `XDate instance`

Possible values for [language]: "EN", "NL", "DE", "FR". Default is "EN".

**Note**: You can also set the formatting language while instantiating (`XDate(null, "FR");`), or
set the language on formatting (`XDate(null).format([formattingstring], "DE");`)

**Examples**

```javascript
const someDate = XDate("2000/01/01");
someDate.setLanguage("NL"); // dutch
someDate.format("DOW d MM yyyy"); // "Zaterdag 1 Januari 2000"
someDate.setLanguage("DE"); // german
someDate.format("DOW d MM yyyy"); // "Samstag 1 Januar 2000"
```
## setUnit
**Parameters** `value`, `unit`

Returns `XDate instance`

**It** sets a part ([unit]) of an XDate instance

**Notes** see `add` for possible unit values. All values to set are translated 
to their equivalent Date set-methods (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).
Setting the month-unit is restricted to the values 1 - 12. Other values will keep the original date value.

**Examples**

```javascript
XDate("2000/01/01").setUnit(4, "month").format("MM"); // "april"
XDate("2000/01/01").setUnit(33, "day").format("yyyy/mm/dd"); // "2000/02/02"
```
