require("dotenv").config();
const axios = require("axios");
const { URL_BASE, API_KEY } = process.env;

const getCharById = async (req, res) => {
  try {
    const response = await axios.get(`${URL_BASE}/character/${req.params.id}`);
    const data = response.data;
    const { id, image, name, gender, species } = data;
    res.status(200).json({
      id,
      image,
      name,
      gender,
      species,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCharById;
