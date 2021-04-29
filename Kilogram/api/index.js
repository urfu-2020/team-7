const baseMeta = require('../config/baseMetaTags.json');
const { getAllContacts } = require('../services/contacts');

exports.base = (req, res) => {
  getAllContacts().then((r) => res.render('base', {
    title: 'Kilogram',
    meta: baseMeta,
    contacts: r,
  }));
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
