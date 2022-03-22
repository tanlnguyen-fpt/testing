const Utils: any = {};

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

Utils.isBlank = function (obj) {
  return Utils.isEmpty(obj) || (typeof obj === 'string' && /\S/.test(obj) === false);
};

Utils.isPresent = function (obj) {
  return !Utils.isBlank(obj);
};

Utils.hasChanges = function (a, b) {
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

['Arguments', 'Array', 'Function', 'String', 'Number', 'Date', 'RegExp'].reduce((obj, name) => {
  obj[`is${name}`] = (x) => toString.call(x) == `[object ${name}]`;
  return obj;
}, Utils);

export default Utils;
