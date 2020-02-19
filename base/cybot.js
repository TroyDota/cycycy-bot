const { Client, Collection } = require('discord.js');
const chalk = require('chalk');
const { readdir } = require('fs');


/**
 * Represents a Discord client
 * @extends Discord.Client
 */
class CyBot extends Client {
  /**
   * @param {Object} options               The options passed to the client
   * @param {Object} options.clientOptions The client options used by the original discord.js client
   * @param {Object} options.config        The filepath to the config file
   * @param {Object} options.perms         The permission levels file
   */
  constructor(options) {
    super(options.clientOptions || {});
    /**
     * Collection of commands
     * @type {Discord.Collection}
     */
    this.commands = new Collection();
    /**
     * Collection of command aliases
     * @type {Discord.Collection}
     */
    this.aliases = new Collection();

    // Bot variables
    /**
     * The bot's configuration
     * @type {Object}
     */
    this.config = options.config ? require(`${options.config}`) : {};
    /**
     * The bot's permission levels
     * @type {Object}
     */

    // Client initialization info
    const nodeVersion = process.versions.node.split('.')[0];
    if (nodeVersion < 12) {
      console.warn(chalk.yellow(`cybot initialized. You are using NodeJS ${process.version}. Versions 12+ are advised to be used.`));
    } else {
      console.info(chalk.green(`cybot initialized. You are using NodeJS ${process.version}.`));
    }
  }

  /**
   * Logs the client in
   * @param {String} token The token used to login for bot
   */
  login(token) {
    // call Discord.Client's login method passing in the token
    super.login(token);

    // Returning the client to allow chaning of function calls
    return this;
  }

  /**
   * Loads all commands in the directory specified
   * @param {String} path The path where the commands are located
   */
  loadCommands(path) {
    readdir(`${path}/regular_commands/`, (err, files) => {
      if (err) console.error(chalk.red(err));

      const jsfile = files.filter(f => f.split('.').pop() === 'js');
      if (jsfile.length <= 0) {
        console.error(chalk.red('Couldn\'t find commands.'));
        return;
      }
      
      jsfile.forEach((f) => {
        const props = require(`../${path}/regular_commands/${f}`);
        console.info(chalk.green(`Command: ${f} loaded!`));
        this.commands.set(props.help.name, props);
      });
    });
  }
}

module.exports = CyBot;
