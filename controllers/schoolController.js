const School = require("../models/schoolModel");
const schoolSchema = require("../validation/schoolValidation");

const schoolController = {
  async addSchool(req, res) {
    try {
      const { error } = schoolSchema.validate(req.body);
      if (error)
        return res.status(400).json({ error: error.details[0].message });

      const schoolId = await School.create(req.body);
      res.status(201).json({
        message: "School created successfully",
        schoolId,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  },

  async listSchools(req, res) {
    try {
      const { latitude, longitude } = req.query;
      if (!latitude || !longitude) {
        return res
          .status(400)
          .json({ error: "Latitude and longitude are required" });
      }

      const schools = await School.getAllNearby(
        parseFloat(latitude),
        parseFloat(longitude)
      );
      res.json(schools);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = schoolController;
