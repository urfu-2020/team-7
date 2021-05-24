const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  username: { type: DataTypes.STRING, unique: true },
  name: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
  theme: { type: DataTypes.STRING },
});

const Chat = sequelize.define('chat', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.STRING, defaultValue: 'DIALOG' },
  name: { type: DataTypes.STRING, defaultValue: null },
  owner: { type: DataTypes.INTEGER, defaultValue: null },
});

const Message = sequelize.define('message', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.STRING, allowNull: false, defaultValue: 'TEXT' },
  content: { type: DataTypes.TEXT, allowNull: false },
});

const UserChat = sequelize.define('user_chat', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasMany(Message);
Message.belongsTo(User);

Chat.hasMany(Message);
Message.belongsTo(Chat);

Chat.belongsToMany(User, { through: UserChat });
User.belongsToMany(Chat, { through: UserChat });

module.exports = {
  User,
  Chat,
  Message,
  UserChat,
};
