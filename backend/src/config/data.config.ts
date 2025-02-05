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
  }
});

export type AppConfigType = ReturnType<typeof appConfig>;
