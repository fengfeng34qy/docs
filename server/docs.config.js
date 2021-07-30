
// process.env.REMOTE_ADDR 或 process.env.NODE_ENV
module.exports = {
    apps: [
        {
            name   : "docs",
            script : "./server.js",
            env_production: {
                NODE_ENV: "production",
                REMOTE_ADDR: "http://wdev.example.com/"
            },
            env_development: {
                NODE_ENV: "development"
            }
        }
    ]
  }