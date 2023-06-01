const db = require("../config/db");

const Location = {
  tableName: "location",
  create: async (name, atitude, longitude, timeStamp) => {
    const result = await db.one(
      `INSERT INTO ${Location.tableName} (name, atitude, longitude, timeStamp) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, atitude, longitude, timeStamp]
    );
    return result;
  },
  
  findLatestByNames: async () => {
    const result = await db.any(`
      SELECT 
        name, 
        atitude, 
        longitude, 
        MAX(timeStamp) as latestTimeStamp
      FROM ${Location.tableName}
      GROUP BY name
    `);
    return result;
  },
};

module.exports = Location;
