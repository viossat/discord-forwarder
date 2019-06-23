module.exports = {
  TOKEN: process.env.TOKEN,
  READING_CHANNELS: (process.env.READING_CHANNELS || '').split(',').filter(Boolean),
  WRITING_CHANNELS: (process.env.WRITING_CHANNELS || '').split(',').filter(Boolean),
  WEBHOOKS: (process.env.WEBHOOKS || '').split(',').filter(Boolean),
};
