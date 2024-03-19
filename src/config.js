module.exports = {
    db: {
      HOST: process.env.PGHOST,
      USER: process.env.PGUSER,
      PASSWORD: process.env.PGPASSWORD,
      DB: process.env.PGDATABASE,
      dialect: "oracle",
      port: 1521,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      dialectOptions: {
        connectString: `${process.env.PGHOST}/${process.env.SERVICENAME}`,
      },
    }
  };
  