const Command = require('../../base/Command');

class DelMod extends Command {
  constructor(bot) {
    super(bot, {
      name: 'delmod',
      description: 'Removes a mod role',
      usage: '$delmod',
      aliases: ['dm'],
      permission: 'ADMINISTRATOR',
      cooldown: 0,
    });
  }

  async run(message, args) {
    const nam = this.bot.emojis.find(emoji => emoji.name === 'NaM');
    this.bot.db.Mod.deleteOne({ serverID: message.guild.id }).then((res) => {
      if (res.n >= 1) {
        return this.reply(`Mod role deleted ${nam}`);
      }
      return this.reply('Mod role is not set in this server');
    }).catch(err => this.reply(`Error ${err}`));
  }
}

module.exports = DelMod;
