const { User, Chat, UserChat } = require('../models/models');

exports.isAuth = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: 'user has not been authenticated',
    });
  } else {
    next();
  }
};

exports.isSelfId = (req, res, next) => {
  try {
    if (req.params.id && parseInt(req.params.id, 10) !== req.user.id) {
      res.status(400).json({ message: 'Bad request. (Your id and user id is not matching)' });
    } else {
      next();
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.isChatAllowedParam = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Error('Chat id is required!');
    }
    const id = parseInt(req.params.id, 10);
    const row = await Chat.findOne({
      raw: true,
      where: {
        id,
      },
    });
    if (!row) {
      throw new Error('Wrong chat ID!');
    }
    if (row.type !== 'CHANNEL') {
      const userIn = await UserChat.findOne({
        where: {
          chatId: row.id,
          userId: req.user.id,
        },
      });
      if (!userIn) {
        throw new Error('You re not allowed to get messages from this chat!');
      }
    }
    if (row) {
      next();
    } else {
      throw new Error('You re not allowed to get messages from this chat!');
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
};

// {to: {type, id}, from: {id, username, ?name}, content: {type, value}}
exports.isCorrectMessageBody = async (req, res, next) => {
  try {
    if (!req.body || !req.body.to || !req.body.to.type || !req.body.to.id || !req.body.from
      || !req.body.from.id || !req.body.from.username || !req.body.content || !req.body.content.type
      || !req.body.content.value) {
      res.status(400).json({ message: 'Incorrect body format!' });
    } else if (!['USER', 'DIALOG', 'CHANNEL', 'GROUP'].includes(req.body.to.type)) {
      res.status(400).json({ message: 'Incorrect chat type!' });
    } else if (req.body.from.id !== req.user.id) {
      res.status(400).json({ message: 'Incorrect sender ID' });
    } else {
      const user = await User.findByPk(req.body.from.id);
      if (!user) {
        res.status(400).json({ message: 'Incorrect sender ID' });
      }
      next();
    }
  } catch (e) {
    res.status(502).json({ message: e.message });
  }
};

exports.isChatAllowedBody = async (req, res, next) => {
  try {
    if (req.body.to.type !== 'USER') {
      if (req.body.to.type === 'CHANNEL') {
        const c = await Chat.findOne({
          raw: true,
          where: {
            id: req.body.to.id,
            type: 'CHANNEL',
            owner: req.body.from.id,
          },
        });
        if (c) {
          next();
        } else {
          res.status(400).json({ message: 'You are not allowed to write here!' });
        }
      } else {
        const c = await Chat.findOne({
          raw: true,
          where: {
            id: req.body.to.id,
          },
          include: [
            {
              model: User,
              where: {
                id: req.body.from.id,
              },
            },
          ],
        });
        if (c) {
          next();
        } else {
          res.status(400).json({ message: 'You\'re not in this chat' });
        }
      }
    } else {
      next();
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
// {name, type, users, owner}
exports.isCorrectChatBody = (req, res, next) => {
  if (!req.body || !req.body.name || !req.body.users || !req.body.owner || !req.body.type) {
    res.status(400).json({ message: 'Incorrect body shape!' });
  } else if (req.body.type !== 'GROUP' && req.body.type !== 'CHANNEL') {
    res.status(400).json({ message: 'Incorrect chat type' });
  } else if (req.body.type === 'GROUP'
    && (req.body.users.length < 3 || !req.body.users.includes(req.user.id))) {
    res.status(400).json({ message: 'You\'re not in users...' });
  } else if (req.body.owner !== req.user.id) {
    res.status(400).json({ message: 'You can create chats only with you as an admin' });
  } else {
    next();
  }
};
