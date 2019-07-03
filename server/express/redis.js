const redis = require('redis');

const client = redis.createClient({
  host: 'redis', // connect to redis container
});
client.on('error', err => {
  if (err) {
    console.error(err);
    throw err;
  }
});

module.exports = client;
