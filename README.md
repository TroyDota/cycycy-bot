# cybot [![CircleCI](https://circleci.com/gh/cycycy-bot/cycycy-bot.svg?style=svg)](https://circleci.com/gh/cycycy-bot/cycycy-bot)
A scuffed bot for a discord server

Website: https://bot.cycycy.me/

Invite link: https://discordapp.com/oauth2/authorize?client_id=530305194131456000&scope=bot&permissions=8

# Contributing
See [the contribution guide](https://github.com/cycycy-bot/cycycy-bot/blob/master/CONTRIBUTING.md) if you'd like to submit a PR.

# Functions(for now)
## --- Admin Commands ---
  ### Set Mod Role **(IMPORTANT TO SETUP)**
  **Sets the mod role of the server to be able to use mod commands**
  * Usage: $setmod <role>
  Alternitavely: You can set it up in cybot's website

  ### Test
  **Tests if the bot is running**
  * Usage: $test
  
  ### Role Counter
  **Returns how many members the given role have**
  * Usage: $rc <role>
  
  ### Set logger channel
  **Enable/Disable the event logger (message deleted, member left, member kicked, etc.)**
  * Usage: $setlogger <enable/disable> <channel> (channel name is optional only if you set it to disabled)
  
  
## --- Mod Commands ---
  ### Adding/Deleting Ban Phrase
  **Adds/Deletes a ban phrase/word to the server**
  * Usage: $addbanphrase <word>
  * Usage: $delbanphrase <word>
  
  ### Adding/Deleting/Editing custom command
  **Adds/Deletes/Edits a custom command to the server**
  * Usage: $addcmd <command_name> <command_response>
  * Usage: $delcmd <command_name>
  * Usage: $editcmd <command_name> <command_response>
  
  ### Adding/Deleting Ban Phrase
  **Adds/Deletes a ban phrase/word to the server**
  * Usage: $addbanphrase <word>
  
  ### Temporary mute/ Unmute
  **Temporarily mutes a user/Unmute a user**
  * Usage: $tempmute <member> <1s/1m/1h/1d>
  * Usage: $unmute <member>

  ### Kick
  **Kicks a user**
  * Usage: $kick <member>
  
## --- Regular Commands ---
  ### Help
  **Shows the command and custom commands in the server**
  * Usage: $help
  
  ### Translate
  **Translates message from any language to english**
  * Usage: $translate <message>

  ### Wiki search
  **Returns a summary of the user's input from wikipedia**
  * Usage: $wiki <word> (word you want to search from wikipedia)

  ### Avatar
  **Shows the user's avatar**
  * Usage: $avatar <member> (optional)

  ### Get User Info
  **Shows the user's information in the server**
  * Usage: $userinfo <member> (optional)
  
  ### Get Server Info
  **Shows the server's information**
  * Usage: $serverinfo
  
  ### Get life advice from bot
  **Gives you advice**
  * Usage: $advice
  * Usage: $cookie (24hr cooldown)

  ### AFK/GN
  **GN sets your status to sleeping/AFK sets your status to AFK**
  * Usage: $afk <message> (optional)
  * Usage: $gn <message> (optional)
  
  ### Tuck
  **Tucks the Sleeping User 4HEad**
  * Usage: $tuck <member>
  
  ### Cat facts HYPERS!!
  **Gives you a fact about cats OMGSCoots**
  * Usage: $catfact
  
  ### Random Cat pictures
  **Gives you a random picture of a cat**
  * Usage: $cat
  
  ### Dog facts Wowee
  **Gives you a fact about dogs OMGSCoots**
  * Usage: $dogfact
  
  ### Random Dog pictures
  **Gives you a random picture of a dog**
  * Usage: $dog <breed> (optional)

  ### Thesaurus
  **Gives you the definition of a word and example**
  * Usage: $thesaurus <word>
  
  ### Reminder
  **Sends a DM in a specified time**
  * Usage: $remindme <time> <message>

# Upcoming features
### ~~Weather Search~~ ✔
### ~~News Search~~ ✔
### Play a music using youtube
### Twitch Live Announcements
### ~~Wiki search~~ ✔
### ~~Translate language~~ ✔
### Trivia games
### Some mini-games

# Ultimate Goal
### ~~Build a web dashboard for the bot.~~ ✔
