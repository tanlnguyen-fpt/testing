import _ from 'lodash';

export default function getTestCase(csv) {
  var lines = csv.split('\n');
  var result: any[] = [];
  var headers;
  headers = lines[0].split(',');

  for (var i = 1; i < lines.length; i++) {
    var obj = {};

    if (lines[i] == undefined || lines[i].trim() == '') {
      continue;
    }

    var words = lines[i].split(',');
    for (var j = 0; j < words.length; j++) {
      obj[headers[j].trim()] = words[j];
    }

    result.push(obj);
  }
  result = _.map(result, (item) => {
    if (!_.isEqual(item['isHasSQRT'], '\r')) {
      const sqrts = _.map(item['isHasSQRT'].split(';'), (i) => {
        const temp = i.split(':');
        return {
          [temp[0]]: item[temp[0]] * Math.sqrt(2),
        };
      });

      return { ...item, ...Object.assign({}, ...sqrts) };
    }
    return item;
  });

  return result;
}
