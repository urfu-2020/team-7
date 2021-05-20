const { Message, User } = require('../models/models');

async function getAllMessages(req, res) {
  try {
    const { id } = req.params;
    const messages = await Message.findAll({
      where: {
        chatId: id,
      },
      include: [
        { model: User, raw: true, attributes: ['name', 'username'] },
      ],
      order: [
        ['createdAt', 'DESC'],
      ],
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

module.exports = {
  getAllMessages,
};
