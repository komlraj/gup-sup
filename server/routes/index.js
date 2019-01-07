const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/signup', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('index');
});

router.get('/create', (req, res) => {
  res.render('index');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).redirect('/login')
});


module.exports = router;