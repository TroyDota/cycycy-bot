const Pedo = require('../../models/pedoModDB');
const Command = require('../../base/Command');

class Pedofy extends Command {
  constructor(bot) {
    super(bot, {
      name: 'pedofy',
      description: 'Gives a member a Pedo(weeb) role',
      usage: '$pedofy <member>',
      cooldown: 0,
      permission: 'MODERATOR',
    });
  }

  async run(message, args, NaM) {
    await Pedo.findOne({ serverID: message.guild.id, userID: message.member.id }).then((pedoRes) => {
      if (!pedoRes) {
        return this.reply(`You dont have permission for this command ${NaM}`);
      }
      if (args[0] === 'help') {
        return this.respond('```Usage: $pedofy <user>```');
      }

      const pedo = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      const weirdChamp = this.bot.emojis.find(emoji => emoji.name === 'WeirdChamp');
      if (!pedo) return this.send(`User not found ${NaM}`);
      if (pedo.id === '487797385691398145') return this.send(`My master is not a pedo ${weirdChamp}`);

      let pedoRole = message.guild.roles.find(role => role.name === 'Pedo');
      if (!pedoRole) {
        pedoRole = message.guild.createRole({
          name: 'Pedo',
          color: '#ff11b0',
          permissions: ['SEND_MESSAGES'],
        })
          .then(prole => pedo.addRole(prole.id))
          .then(this.respond(`${pedo.user.username} is now a Pedo`))
          .catch(err => this.reply(`Error ${err}`));
      } else {
        return pedo.addRole(pedoRole)
          .then(this.respond(`${pedo.user.username} is now a Pedo`))
          .catch(err => this.reply(`Error ${err}`));
      }
    }).catch(err => this.reply(`Error ${err}`));
  }
}

module.exports = Pedofy;
