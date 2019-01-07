const Channel = require('../models/Channel');

module.exports = {
  create: (req, res) => {
    console.log(req.body, "req.body in channel")
    const { name } = req.body;
    const newChannel = new Channel({
      name,
      members: [],
      messages: [],
      date: new Date(),
    });
    newChannel.save((err, data) => {
      if(err) throw err;
      else { 
        return res.status(200).json({
          "message" : "create channel successfull"
        })
      }
    })
  },

};
