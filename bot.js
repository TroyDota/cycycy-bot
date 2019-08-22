const Discord = require('discord.js');
const botconfig = require('./botconfig.json');

const bot = new Discord.Client();
require('dotenv').config();

// Read commands directory
module.exports = bot;
require('./fsCommandReader');
require('./handlers/index');

// bot commands collection
bot.commands = new Discord.Collection();

// global command cooldown
bot.cooldown = new Set();

// cookie command cooldown
bot.cookieCD = new Map();

// Database
const db = require('./settings/databaseImport');

// connect to MongoDB Atlas
db.mongoose.connect(process.env.DB_PASS, { useNewUrlParser: true }, (err) => {
  if (err) {
    bot.channels.get('531967060306165796').send(`Error connecting to DB: ${err}`);
  }
});

bot.on('ready', async () => {
  console.log(`${bot.user.username} is online! on ${bot.guilds.size} servers!`);
  bot.user.setActivity('forsan [!=help]', { type: 'WATCHING' });
  bot.channels.get('531967060306165796').send(`${bot.user.username} is online on ${bot.guilds.size} servers!`); // my discord's bot test channel
});

bot.on('error', console.error); // error handler

bot.on('message', (message) => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  if (bot.cooldown.has(message.author.id)) return;

  const { prefix } = botconfig;
  const messageArray = message.content.split(' ');
  const cmd = messageArray[0];
  const args = messageArray.slice(1);

  // Emotes
  const NaM = bot.emojis.find(emoji => emoji.name === 'NaM');
  const OMGScoots = bot.emojis.find(emoji => emoji.name === 'OMGScoots');
  const weirdChamp = bot.emojis.find(emoji => emoji.name === 'WeirdChamp');

  // call command handler
  const cmdFile = bot.commands.get(cmd.slice(prefix.length));
  if (cmdFile && cmd.startsWith(prefix)) cmdFile.run(bot, message, args, NaM, OMGScoots);

  // type
  if (message.isMentioned(bot.user)) {
    message.channel.startTyping(100);
    setTimeout(() => {
      message.reply(`what ${weirdChamp}❓`);
      return message.channel.stopTyping(true);
    }, 2000);
  }

  // AFK checker
  db.Afk.findOne({ userID: message.author.id }).then((result) => {
    if (result) {
      const newTime = new Date();
      const ms = newTime - result.date;
      let totalSecs = (ms / 1000);
      const hours = Math.floor(totalSecs / 3600);
      totalSecs %= 3600;
      const minutes = Math.floor(totalSecs / 60);
      const seconds = totalSecs % 60;

      const backEmbed = new Discord.RichEmbed()
        .setTitle(`${message.author.username} is back (${hours}h, ${minutes}m and ${Math.trunc(seconds)}s ago)`)
        .addField('Message: ', result.reason || 'null')
        .setColor(message.guild.member(message.author).highestRole.color);
      if (result.afkType === 'gn') backEmbed.setFooter(`tucked by ${result.tucker || 'no one PepeHands'}`);

      message.channel.send(backEmbed);
      // Checks if AFK type is gn or afk;
      if (result.afkType === 'afk') return db.Afk.deleteOne({ userID: result.userID }).then(console.log('Message Deleted')).catch(console.log);

      // Proceeds if AFK type is gn
      if (hours >= 9) {
        const afkEmbed = new Discord.RichEmbed()
          .setColor('#f20000')
          .addField(`${message.author.username} you have slept for more than 9hrs`, `"Too much sleep on a regular basis can increase the risk of diabetes, heart disease, stroke and death according to several studies done over the years. Too much is defined as greater than nine hours" ${OMGScoots}`);
        message.channel.send(afkEmbed);
      } else if (hours < 6) {
        const afkEmbed = new Discord.RichEmbed()
          .setColor('#f20000')
          .addField(`${message.author.username} you have slept for less than 6hrs`, `"People who sleep less than 6 hours a night may be at increased risk of cardiovascular disease compared with those who sleep between 7 and 8 hours, suggests a new study published in the Journal of the American College of Cardiology. Poor quality sleep increases the risk of atherosclerosis—plaque buildup in the arteries throughout the body—according to the study." ${OMGScoots}`);
        message.channel.send(afkEmbed);
      }
      db.Afk.deleteOne({ userID: result.userID }).then(console.log('Message Deleted')).catch(console.log);
    }
  });

  // AFK Tagged checker
  db.Afk.find({}).then((afkRes) => {
    afkRes.forEach((res) => {
      if (message.isMentioned(res.userID)) {
        if (cmd.startsWith(prefix)) return;
        const notifyUser = message.mentions.users.find(user => user.id === res.userID);

        const notify = new db.Notify({
          _id: db.mongoose.Types.ObjectId(),
          username: notifyUser.username,
          userID: res.userID,
          senderName: message.author.username,
          senderAvatar: message.member.user.avatarURL,
          serverName: message.guild.name,
          notifyMsg: message.content,
          date: new Date(),
        });

        db.Notify.find({ userID: res.userID }).then((notifyRes) => {
          if (notifyRes.length >= 3) { // message limiter
            return message.reply(`${notifyUser.username} has already reached the limit of recieving messages ${NaM}`);
          }
          return notify.save().then(() => message.reply(`${notifyUser.username} is afk but i will send him that message when he types in this server ${OMGScoots} 👍`)).catch(console.log);
        });
      }
    });

    // Custom command checker
    if (cmd.startsWith(prefix)) {
      const cmdChk = cmd.slice(2);
      db.Cmd.findOne({ serverID: message.guild.id, commandName: cmdChk }).then((res) => {
        if (res) {
          return message.channel.send(res.commandRes);
        }
      }).catch(console.log);
    }

    // Ban Phrase checker
    db.BanPhrase.find({ serverID: message.guild.id }).then((res) => {
      res.forEach((bp) => {
        if (message.content.toUpperCase().includes(bp.banphrase.toUpperCase())) {
          return message.delete().then(message.reply(`Your message matched the ban phrase in this server ${weirdChamp}`)).catch(console.log);
        }
      });
    });
  }).catch(console.log);

  // Notify checker
  db.Notify.find({ userID: message.author.id }).then((result) => {
    if (result.length >= 1) {
      message.reply(`You have notifications ${NaM}`);

      result.forEach((resData) => {
        const newTime = new Date();
        const ms = newTime - resData.date;
        let totalSecs = (ms / 1000);
        const hours = Math.floor(totalSecs / 3600);
        totalSecs %= 3600;
        const minutes = Math.floor(totalSecs / 60);
        const seconds = totalSecs % 60;

        const notifyEmbed = new Discord.RichEmbed()
          .setColor('#4e1df2')
          .setAuthor(`${resData.senderName} sent you a message from ${resData.serverName} server:`, resData.senderAvatar)
          .addField(`Message (${hours}h, ${minutes}m and ${Math.trunc(seconds)}s ago): `, resData.notifyMsg);
        return message.channel.send(notifyEmbed)
          .then(() => {
            db.Notify.deleteOne({ userID: resData.userID }).then(console.log('Message Deleted')).catch(console.log);
          })
          .catch(console.log);
      });
    }
  });

  // get rid of weebs NaM
  if (message.content.toUpperCase().includes('AYAYA')) {
    if (message.channel.id === '500399188627161109' || message.channel.id === '579333258999889981') return; // weeb dungeon
    const DansGame = bot.emojis.find(emoji => emoji.name === 'DansGame');
    message.channel.send(`${DansGame.toString()} :point_right: :door:`);
    message.channel.send('WEEBS OUT');
    message.react(DansGame.id).then(() => {
      message.react('👉').then(() => {
        message.react('🚪').catch(console.log);
      }).catch(console.log);
    }).catch(console.log);
  }
});

bot.login(process.env.BOT_TOKEN);
