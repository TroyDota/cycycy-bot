const mongoose = require('mongoose');
const Cmd = require('../../models/customCommandsDB');
const Mods = require('../../models/modDBtest');

module.exports.run = async (bot, message, args, NaM) => {
  if (args[0] === 'help') {
    message.channel.send('```Usage: !=addcmd <command name> <command response>```');
    return;
  }

  Mods.findOne({ serverID: message.guild.id }).then((res) => {
    if (res) {
      const serverRole = message.guild.roles.get(res.modName);
      if ((res.modName === serverRole.id && message.member.roles.has(serverRole.id)) || message.member.hasPermission('ADMINISTRATOR')) {
        const cmdRes = args.slice(1);
        const resJoined = cmdRes.join(' ');
        if (!args[0]) return message.reply(`Please add a command name ${NaM}`);
        if (!resJoined) return message.reply(`Please add a command response ${NaM}`);

        const cmd = new Cmd({
          _id: mongoose.Types.ObjectId(),
          serverID: message.guild.id,
          serverName: message.guild.name,
          commandName: args[0],
          commandRes: resJoined,
        });
        const defaultCmds = ['avatar', 'stats', 'uptime', 'restart', 'addcmd', 'delcmd', 'editcmd', 'userinfo', 'advice', 'tempmute', 'translate', 'wiki', 'afk', 'notify', 'unmute', 'help', 'tuck', 'warn', 'serverinfo', 'botinfo', 'catfact', 'test', ''];
        Cmd.find({ serverID: message.guild.id, commandName: args[0] }).then((serverRes) => {
          if (serverRes.length >= 1) {
            return message.channel.send('Command already exists');
          } if (defaultCmds.includes(args[0])) {
            return message.channel.send(`Sorry can't add that ${NaM}`);
          }
          return cmd.save().then(message.channel.send('Command Added')).catch(err => message.reply(`Error ${err}`));
        });
      } else {
        return message.reply(`You don't have permission for this command ${NaM}`);
      }
    } else {
      return message.reply(`You haven't set a mod in this server ${NaM}. To set a mod in this server do !=setmod help.`);
    }
  }).catch(err => message.reply(`Error ${err}`));
};

module.exports.help = {
  name: 'addcmd',
};
