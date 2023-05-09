const Image = require("../models/image");

exports.createImage = async (req, res) => {
  try {
    const { image_url, quality_control_id, status, work_id } = req.body;
    const newImage = await Image.create(image_url, quality_control_id, status, work_id);
    res.status(201).send({ message: "Image created successfully", image: newImage });
  } catch (error) {
    res.status(500).send({ message: "Error creating image", error: error.message });
  }
};

exports.getImagesByQualityControlId = async (req, res) => {
    try {
      const { quality_control_id } = req.params;
      const images = await Image.findByQualityControlId(quality_control_id);
    res.status(200).send({ data: images });
  } catch (error) {
    res.status(500).send({ message: "Error retrieving images", error: error.message });
  }
};