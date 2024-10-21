const system = require('./system.js')
const fs = require('fs')
module.exports = {
    apps: system.services.reduce((total, service) => {
      if(service.disabled) return total
      //check for pm2.config.cjs or pm2.config.js
      if(fs.existsSync('./apps/'+(service.dirname ?? service.name)+'/pm2.config.cjs')) return [...total, ...require('./apps/'+(service.dirname ?? service.name)+'/pm2.config.cjs').apps]
      return [...total, ...require('./apps/'+(service.dirname ?? service.name)+'/pm2.config.js').apps]
    }, [])
};