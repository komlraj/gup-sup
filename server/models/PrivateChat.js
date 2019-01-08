const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PrivateChatSchema = new Schema({
  toUser: { type: ObjectId, ref: 'User' },
  fromUser: { type: ObjectId, ref: 'User' },
  messages: [{
    userId: { type: ObjectId, ref: 'User' },
    message: String,
    date: { type: Date },
  }],
});

const PrivateChat = mongoose.model('PrivateChat', PrivateChatSchema);

module.exports = PrivateChat;
