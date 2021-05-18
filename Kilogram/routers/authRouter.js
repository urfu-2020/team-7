const router = require('express').Router();
const passport = require('passport');
const { logout } = require('../api/redirects');
const { passData } = require('../api/jsons');
const { error401 } = require('../api/errors');

router.get('/login/success', passData);
router.get('/login/failed', error401);
router.get('/logout', logout);
router.get('/github', passport.authenticate('github'));
router.get('/github/redirect', passport.authenticate('github', {
  successRedirect: process.env.CLIENT_HOME_URL,
  failureRedirect: '/auth/login/failed',
}));

module.exports.authRouter = router;
