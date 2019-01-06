module.exports = {
  isLoggedIn: function(req, res, next) {
    console.log(req.user, "req user")
    if(req.user) {
      return next();
    } else {
      res.status(400).send({ message: 'Please login to get your information.'})
    }
  }
};