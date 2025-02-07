export const appConfig = () => ({
  application: {
    port: process.env.PORT || 3031,
  },
  cors: {
    corsOrigin: process.env.CORS_ORIGIN?.split(';'),
    corsMethods:
      process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  },
  database: {
    uri: process.env.DATABASE_URL || 'mongodb://localhost:27017/fintracker',
  },
  secrets: {
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'i6aXnMuF5OQQwNqC',
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || '1LjF6lwVZ7VDhS4S',
  },
  brapi: {
    baseUrl: process.env.BRAPI_BASE_URL || 'https://brapi.dev/api',
    token: process.env.BRAPI_TOKEN,
  },
});

export type AppConfigType = ReturnType<typeof appConfig>;
