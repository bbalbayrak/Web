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