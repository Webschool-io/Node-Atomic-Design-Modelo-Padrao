'use strict';
module.exports = (arr) => {
  let Ref = {};
  arr.forEach( (element, index) => {
    if(element.options.ref) {
      // ACHOU UMA REFERENCIA
      Ref.ref = element.options.ref;
      Ref.path = element.path;
    }
  });
  return Ref;
};