'use strict';
module.exports = (arr) => {
  let Refs = [];
  let RefsReturn = [];

  Refs = arr.filter((element) => (element.options.ref) || element.caster);
  Refs.forEach( (element, index) => {
    if(element.options.ref) {
      let obj = {};
      // ACHOU UMA REFERENCIA SIMPLES
      obj.ref = element.options.ref;
      obj.path = element.path;
      RefsReturn.push(obj);
    }
    if(element.caster) {
      let obj = {};
      // ACOU UMA REFERENCIA EM ARRAY
      obj.ref = element.options.type[0].ref;
      obj.path = element.path;
      RefsReturn.push(obj);
    }
  });
  return RefsReturn;
};