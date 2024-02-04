const express = require("express");
const router = express.Router();
const { fetchSongs, createSong, updateSong, deleteSong } = require("../controllers/songController");

router.route("/").get(fetchSongs);
router.route("/").post(createSong);
router.route("/:id").put(updateSong);
router.route("/:id").delete(deleteSong);

module.exports = router;