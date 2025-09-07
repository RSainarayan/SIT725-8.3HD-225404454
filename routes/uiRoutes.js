const express = require('express');
const path = require('path');
const passport = require('passport');
const router = express.Router();

function ensureAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  res.redirect('/login');
}

// Serve login page (now from views folder)
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'pages', 'login.html'));
});

// Handle login (form POST)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/dashboard');
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {});
  res.redirect('/login');
});

// Protect dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'dashboard.html'));
});

// Return current user (simple JSON)
router.get('/me', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) return res.status(401).json({});
  const u = req.user;
  res.json({ email: u.email, id: u._id });
});

module.exports = router;
