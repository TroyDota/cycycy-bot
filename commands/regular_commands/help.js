const Discord = require('discord.js');
const Cmd = require('../../models/customCommandsDB');
const Mods = require('../../models/modDBtest');

module.exports.run = async (bot, message, args) => {
  const hUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  const helpEmbed = new Discord.RichEmbed()
    .setDescription('Help Menu')
    .setColor('#4286f4')
    .addField('Command Help', 'do **!=<command_name> help** for command usage')
    .addField('Member Commands', '**serverinfo** | info about server \n **botinfo** | info about bot \n **userinfo** | info about user \n **advice/cookie** | gives you advice or fortune cookie OMGScoots \n **catfact** | random cat facts \n **translate** | automatically translates detected langauge \n **gn/afk** | set status to AFK or sleeping(gives you stats about your sleep time)\n **notify** | notify a specific user \n **tuck** | tuck someone to bed \n **wiki** | wiki search OMGScoots \n **avatar** | shows the user\'s avatar');

  await message.channel.send(helpEmbed);

  Cmd.find({ serverID: message.guild.id }).then((res) => {
    const cmdArr = [];
    res.forEach(serverCmd => cmdArr.push(serverCmd.commandName));

    const joined = cmdArr.join(' \n');

    const serverCmdEmbed = new Discord.RichEmbed()
      .setDescription('Server Commands')
      .setColor('#23ff74')
      .addField('Server Specific Commands', `${joined}`);

    return message.channel.send(serverCmdEmbed);
  }).catch(err => message.reply(`Error ${err}`));

  Mods.findOne({ serverID: message.guild.id }).then((res) => {
    if (res) {
      const serverRole = message.guild.roles.get(res.modName);
      if (res.modName === serverRole.id && message.member.roles.has(serverRole.id) || message.member.hasPermission('ADMINISTRATOR')) {
        const modEmbed = new Discord.RichEmbed()
          .setDescription('Mod Help Menu')
          .setColor('#6dbefd')
          .addField('Mod Commands', 'tempmute | temporarily mutes a user \n unmute | unmute a user \n addcmd | adds a command \n editcmd | edits a custom command \n delcmd | deletes a custom command \n addbanphrase | adds a banphrase \n delbanphrase | deletes a banphrase');

        try {
          message.author.send(modEmbed);
        } catch (e) {
          message.reply("Your DMs are locked. I can't send mod commands");
        }

        if (message.member.hasPermission('ADMINISTRATOR')) {
          const adminEmbed = new Discord.RichEmbed()
            .setDescription('Admin Help Menu')
            .setColor('#008fff')
            .addField('Admin Commands', 'setmod | sets mod role for the server **IMPORTANT TO SETUP!** \n delmod | deletes a mod role in server \n rc | counts how many members a role has \n setlogger | sets the logger channel in the server \n test | tests if the bot is running \n stats | server count');

          try {
            message.author.send(adminEmbed);
          } catch (e) {
            message.reply("Your DMs are locked. I can't send admin commands");
          }
        }
      } else {

      }
    } else {

    }
  }).catch(err => message.reply(`Error ${err}`));
};

module.exports.help = {
  name: 'help',
};
