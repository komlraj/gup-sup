const PrivateMessage = require('../models/PrivateMessage');

module.exports = {

privateMessage: (req, res) => {
    const { toUser, fromUser } = req.body;
    PrivateMessage.find({ $or: [
      {$and: [{toUser: toUser}, {fromUser: fromUser}]}, 
      {$and: [{toUser: fromUser}, {fromUser: toUser}]} 
    ]}, (err, data)=> {
    if (!err) res.json(data);
    });
  },

  addPrivateMessage: (req, res) => {
    
  },

};
