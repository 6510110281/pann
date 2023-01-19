import dbconnectinfo from './db-conn.json'

const isProd = process.env.NODE_ENV == 'production'
let appConfig = {
  isProd,
  isDev: !isProd,
  clearDataBeforeLodingFixture: isProd ? false : true,
  dbconnectinfo,
  ssoIssuer: 'http://localhost:8888/realms/master'
}

export default appConfig;