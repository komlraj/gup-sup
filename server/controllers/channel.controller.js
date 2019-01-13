const Channel = require('../models/Channel');

module.exports = {
  create: (req, res) => {
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

  allChannel: (req, res) => {
    Channel.find({}, (err, channels) => {
      if (err) throw err;
      else res.json({ listOfChannel: channels })
    })
  },

  channelInfo: (req, res) => {
    Channel.findById(req.params.id, (err, data) => {
      if(!err) res.json(data);
    })
  },

  channelMessage: (req, res) => {
    const { messageInfo } = req.body;
    let msgObj = {
      username: messageInfo.author,
      message: messageInfo.message,
      date: new Date(),
    }
    Channel.findOneAndUpdate( { _id: req.body.channelId }, { $push: {messages: msgObj}}, (err, data) => {
      if (!err) {
        Channel.find({ _id: req.body.channelId }, (err, data) => {
          if (!err) return res.json(data);
        })
      }
    })
    
  },

};
