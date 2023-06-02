const Location = require("../models/location");

exports.createLocation = async (req, res) => {
  try {
    const { name, atitude, longitude, timeStamp } = req.body;
    const newLocation = await Location.create(name, atitude, longitude, timeStamp);
    res.status(201).send({ message: "Location created successfully", location: newLocation });
  } catch (error) {
    console.error("Error in createLocation:", error);
    res.status(500).send({ message: "Error creating location", error: error.message });
  }
};

exports.getLatestLocations = async (req, res) => {
    try {
      const locations = await Location.findLatestByNames();
      res.status(200).send({ data: locations });
    } catch (error) {
      console.error("Error in getLatestLocations:", error);
      res.status(500).send({ message: "Error retrieving latest locations", error: error.message });
    }
};

exports.getAllLocations = async (req, res) => {
    try {
      const locations = await Location.getAll();
      const groupedLocations = locations.reduce((acc, location) => {
        acc[location.name] = acc[location.name] || [];
        acc[location.name].push({
          id: location.id,
          atitude: location.atitude,
          longitude: location.longitude,
          timeStamp: location.timestamp
        });
        return acc;
      }, {});
  
      const result = Object.keys(groupedLocations).map(name => ({
        name,
        locations: groupedLocations[name]
      }));
  
      res.status(200).send({ message: "Locations fetched successfully", location: result });
    } catch (error) {
      console.error("Error in getAllLocations:", error);
      res.status(500).send({ message: "Error getting locations", error: error.message });
    }
  };