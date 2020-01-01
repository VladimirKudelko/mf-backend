const config = {
  mongodb: {
    url: 'mongodb://uladzimir.kudzelka:vnkudelko1998@ds147225.mlab.com:47225/money-manager',
    databaseName: 'money-manager',
    options: {
      useNewUrlParser: true,
    }
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog'
};

module.exports = config;
