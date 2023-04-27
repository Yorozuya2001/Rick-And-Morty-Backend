require("dotenv").config();
const axios = require("axios");
const { URL_BASE, API_KEY } = process.env;

const getCharDetail = async (req, res) => {
  try {
    const response = await axios.get(
      `${URL_BASE}/character/${req.params.id}?key=${API_KEY}`
    );
    const data = response.data;
    const { id, image, name, gender, species, origin, status, location } = data;
    console.log(data);
    res.status(200).json({
      id,
      image,
      name,
      gender,
      species,
      origin,
      status,
      location,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCharDetail;
