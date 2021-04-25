const baseMeta = require('../config/baseMetaTags.json');

exports.base = (req, res) => {
  res.render('base', {
    title: 'Kilogram',
    meta: baseMeta,
  });
};
