const asyncHandler = require("express-async-handler");
const Song = require("../models/song");

const fetchStats = asyncHandler(async (req, res) => {
    const totalSongs = await Song.countDocuments();
    const totalArtists = await Song.distinct('artist').countDocuments();
    const totalAlbums = await Song.distinct('album').countDocuments();
    const totalGenres = await Song.distinct('genre').countDocuments();

    const songsByGenre = await Song.aggregate([
      {
        $group: {
          _id: '$genre',
          count: { $sum: 1 }
        }
      }
    ]);

    const songsByArtist = await Song.aggregate([
      {
        $group: {
          _id: '$artist',
          count: { $sum: 1 }
        }
      }
    ]);

    const songsByAlbum = await Song.aggregate([
      {
        $group: {
          _id: '$album',
          count: { $sum: 1 }
        }
      }
    ]);

    const statistics = {
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      songsByGenre,
      songsByArtist,
      songsByAlbum
    };

    res.json(statistics);
});

module.exports = {
    fetchStats,
}