const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  const aUser = message.guild.member(message.mentions.users.first() || message.author);
  if (args[0] === 'help') {
    message.channel.send('```Usage: !=avatar <user/empty>```');
    return;
  }
  if (!aUser) return message.channel.send(`User not found ${NaM}`);

  const avatarEmbed = new Discord.RichEmbed()
    .setImage(aUser.user.displayAvatarURL);
  return message.channel.send(avatarEmbed);
};

module.exports.help = {
  name: 'avatar',
};
