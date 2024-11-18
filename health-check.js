import http from 'http';

const options = {
  host: 'localhost',
  port: process.env.PORT || 8080,
  timeout: 2000,
  path: '/'
};

const healthCheck = http.request(options, (res) => {
  console.log(`HEALTHCHECK STATUS: ${res.statusCode}`);
  if (res.statusCode == 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

healthCheck.on('error', function(err) {
  console.error('HEALTHCHECK ERROR:', err);
  process.exit(1);
});

healthCheck.end();
