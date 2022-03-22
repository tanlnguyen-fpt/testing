const Utils: any = {};
/**
  Verifies that a value is `null` or `undefined`, an empty string, or an empty
  array.
  Constrains the rules on `isNone` by returning true for empty strings and
  empty arrays.
  If the value is an object with a `size` property of type number, it is used
  to check emptiness.
  ```javascript
    isEmpty();                 // true
    isEmpty(null);             // true
    isEmpty(undefined);        // true
    isEmpty('');               // true
    isEmpty([]);               // true
    isEmpty({ size: 0});       // true
    isEmpty({});               // true
    isEmpty('Adam Hawkins');   // false
    isEmpty([0,1,2]);          // false
    isEmpty('\n\t');           // false
    isEmpty('  ');             // false
    isEmpty({ size: 1 })       // false
    isEmpty({ size: () => 0 }) // false
    isEmpty(new Date())        // false
  ```
  @method isEmpty
  @static
  @param {Object} obj Value to test
  @return {Boolean}
*/
Utils.isEmpty = function (obj) {
  const none = obj === null || obj === undefined;
  if (none) {
    return none;
  }
  const isDate = obj instanceof Date;
  if ((typeof obj === 'object' && !isDate) || typeof obj === 'string') {
    const { length } = Object.keys(obj);
    // check only if size is only property
    if (obj.size && length === 1) {
      let size = typeof obj.size === 'function' ? 1 : obj.size;
      return typeof size === 'number' ? !size : false;
    }
    // test Array + String + Object
    if (typeof length === 'number') {
      return !length;
    }
  }
  return false;
};
/**
  A value is blank if it is empty or a whitespace string.
  ```javascript
  isBlank();                // true
  isBlank(null);            // true
  isBlank(undefined);       // true
  isBlank('');              // true
  isBlank([]);              // true
  isBlank('\n\t');          // true
  isBlank('  ');            // true
  isBlank({});              // true
  isBlank('\n\t Hello');    // false
  isBlank('Hello world');   // false
  isBlank([1,2,3]);         // false
  isBlank(new Date());      // false
  ```
  @method isBlank
  @static
  @param {Object} obj Value to test
  @return {Boolean}
*/
Utils.isBlank = function (obj) {
  return Utils.isEmpty(obj) || (typeof obj === 'string' && /\S/.test(obj) === false);
};
/**
  A value is present if it not `isBlank`.
  @method isPresent
  @static
  @param {Object} obj Value to test
  @return {Boolean}
*/
Utils.isPresent = function (obj) {
  return !Utils.isBlank(obj);
};
const objHop = Object.prototype.hasOwnProperty;
/**
  For testing if a partial/complete update object
  has changes to an orignal object, such as a model.
  ie:
    if (hasChanges(model, updateData)) {
      // do server update, and update local props
    }
  @method hasChanges
  @static
  @param a {Object} original object
  @param b {Object} change/update object
  @return {Boolean}
*/
Utils.hasChanges = function (a, b) {
  // Create arrays of property names
  const aProps = Object.keys(a);
  const bProps = Object.keys(b);
  if (bProps.length !== aProps.length) {
    return true;
  }
  const isDiff =
    bProps.filter((prop) => {
      const isNew = !aProps.includes(prop) || (aProps.includes(prop) && a[prop] !== b[prop]);
      return isNew;
    }).length !== 0;
  return isDiff;
};
/**
  Resolves is{Type}.
    ie: Utils.isString('fdskgfsd');
*/
['Arguments', 'Array', 'Function', 'String', 'Number', 'Date', 'RegExp'].reduce((obj, name) => {
  obj[`is${name}`] = (x) => toString.call(x) == `[object ${name}]`;
  return obj;
}, Utils);
export default Utils;
