require('dotenv').config()

module.exports = {
  MONGO_URI: process.env.MONGO_URI || '',
  TIEMPO_EXPIRACION: process.env.TIEMPO_EXPIRACION || 3000,
  PORT : process.env.PORT || 8080,
  MODE: process.argv[2] || 'FORK',
  EMAIL_ADMIN:  process.env.EMAIL_ADMIN || '',
  CLIENT_ID:  process.env.CLIENT_ID || '',
  CLIENT_SECRET:  process.env.CLIENT_SECRET || '',
  REFRESH_TOKEN:  process.env.REFRESH_TOKEN || '',
  ACCESS_TOKEN:  process.env.ACCESS_TOKEN || '',
  DATA_CONNECT: process.argv[3] || 'file',
  }