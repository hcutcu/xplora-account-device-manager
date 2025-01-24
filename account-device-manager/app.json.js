export default ({ config }) => {
  const isDev = process.env.NODE_ENV === 'development';

  return {
    ...config,
    extra: {
      apiUrl: isDev
        ? {
            web: 'http://localhost:4000',
            android: 'http://10.0.2.2:4000',
            ios: 'http://localhost:4000',
          }
        : {
            web: 'https://api.prodLink.com',
            android: 'https://api.prodLink.com',
            ios: 'https://api.prodLink.com',
          },
    },
  };
};
