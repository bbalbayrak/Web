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
        l.name, 
        l.atitude, 
        l.longitude, 
        l.timeStamp as latestTimeStamp
      FROM location l
      INNER JOIN (
        SELECT name, MAX(timeStamp) as maxTimeStamp
        FROM location
        GROUP BY name
      ) subq
      ON l.name = subq.name AND l.timeStamp = subq.maxTimeStamp
    `);
    return result;
},
};

module.exports = Location;
