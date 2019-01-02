module.exports = {
  isLoggedIn: function(req, res, next) {
    if(req.user) {
      return next();
    } else {
      res.status(400).send({ message: 'Please login to get your information.'})
    }
  }
};