const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ChannelSchema = new Schema({
  name: String,
  members: [{
    type : ObjectId, ref : 'User'
  }],
  messages: [{
    username: { type: String, ref: 'User' },
    message: String,
    date: { type: Date }
  }],
  date : { type : Date },
});

const Channel = mongoose.model('Channel', ChannelSchema);

module.exports = Channel;