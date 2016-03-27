'use strict';

module.exports = (err, data, res) => {
  if (err) return console.log('Erro:', err);
  res.json(data);
};
