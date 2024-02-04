const mongoose = require("mongoose");
const { genresEnum } = require("./enums");
const songsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    artist: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        enum: Object.values(genresEnum)
    },
    album: {
        type: String,
    },
},{
timestamps: true
});

module.exports = mongoose.model("Song", songsSchema);