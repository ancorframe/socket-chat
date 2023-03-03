const Message = require('./model')

const addMessage = async (data) => {
    return await Message.create(data)
}

const getAllMessage = async() => {
    return await Message.find().sort({createdAt:-1})
}
module.exports = {
  addMessage,
  getAllMessage,
};