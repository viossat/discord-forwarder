const config = require('./config');
const Discord = require('discord.js');
const request = require('request');

const client = new Discord.Client();

client.on('ready', () => {
  console.info('logged in as ' + client.user.tag);
});

client.on('error', err => {
  console.error(err);
  process.exit(1);
});

client.on('warn', message => {
  console.warn(message);
});

client.on('reconnecting', message => {
  console.info('reconnecting...');
});

client.on('resume', message => {
  console.info('connected');
});

client.on('disconnect', message => {
  console.info('disconnected');
  process.exit(1);
});

client.on('message', message => {
  if (config.READING_CHANNELS.includes(message.channel.id)) {
    let content = message.cleanContent;
    message.attachments.forEach(attachment => {
      content += '\n' + attachment.proxyURL;
    });

    config.WRITING_CHANNELS.forEach(channel => {
      client.channels.get(channel).send(content).catch(err => {
        console.error(err);
      });
    });

    config.WEBHOOKS.forEach(webhook => {
      request({
        url: webhook,
        method: 'POST',
        json: {
          content: content,
        },
      }, err => {
        if (err) {
          console.error(err);
        }
      });
    });
  }
});

client.login(config.TOKEN);
