const value = 'https://github.com/iuhuiahu';
const test = require('./quarks/isLink')(value);

if(!test) console.log(require('./quarks/isLinkMessage'));
else console.log('VALIDO!!!!!');