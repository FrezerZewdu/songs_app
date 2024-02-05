const { check, validationResult } = require("express-validator");
const { genresEnum } = require ("../models/enums");
const asyncHandler = require("express-async-handler");
const Song = require("../models/song");

const fetchSongs = asyncHandler(async (req, res) => {
    if(req.query.genre) {
        const wantedGenre = req.query.genre;
        const filteredSongs = await Song.find({
            genre: wantedGenre,
        })
        res.status(200).json(filteredSongs);
    } else {
        const songs = await Song.find()
        res.status(200).json(songs);
    }
});

const createSong = asyncHandler(async (req, res) => {    
    const song = await Song.create({
        title: req.body.title,
        artist: req.body.artist,
        genre: req.body.genre,
        album: req.body.album,
    });

    if (!song) {
        res.status(400).json({ message: "Error creating the song"});
    }
    res.status(201).json(song);
})

const updateSong = asyncHandler(async (req, res) => {
    const song = await Song.findById(req.params.id);

    if(!song) {
        res.status(400);
        throw new Error("Song not found");
    }

    const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, {new: true });

    res.status(200).json(updatedSong);
})

const deleteSong = asyncHandler(async(req, res) => {
    const song = await Song.findById(req.params.id);

    if(!song) {
        res.status(400);
        throw new Error("Song not found");
    }

    await song.deleteOne();
    res.status(200).json({ id: req.params.id });
})

module.exports = {
    fetchSongs,
    createSong,
    updateSong,
    deleteSong,
}