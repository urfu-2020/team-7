const baseMeta = require('../config/baseMetaTags.json');

exports.base = (req, res) => {
  res.render('base', {
    title: 'Kilogram',
    meta: baseMeta,
  });
};

exports.login = (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('login', {
      title: 'Kilogram Login',
      meta: baseMeta,
    });
  }
};
