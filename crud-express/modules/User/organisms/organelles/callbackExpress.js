'use strict';

module.exports = (err, data, res) => {
  console.log(err, data)
  if (err) return console.log('Erro:', err);
  res.json(data);
};
