const ms = require('ms');

module.exports.run = (bot, message, args, NaM) => {
  if (args[0] === 'help') {
    return message.channel.send('```Usage: $remindme <time> <message>```');
  }

  let time = args[0];
  let rmdMessage = args.slice(1).join('');

  message.reply(`I will send you a message in ${time} ${NaM}`);
  setTimeout(() => {
    try {
      message
        .author
        .send(rmdMessage);
    } catch (e) {
      return message.reply('Your DMs are locked. I can\'t send mod commands');
    }
  }, ms(time));
};

module.exports.help = {
  name: 'remindme',
};
