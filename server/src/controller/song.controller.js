import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
  // -1  means descending order newest to oldest
  // 1 means ascending order oldest to newest
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).send(songs);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getSongById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).send("Song not found");
    }
    res.status(200).send(song);
  } catch(error) {
    console.error(error);
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    console.log("Fetching featured songs...");

    const songs = await Song.aggregate([
      { $sample: { size: 6 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    console.log("Featured songs retrieved:", songs.length, "songs found.");

    if (!songs || songs.length === 0) {
      return res.status(200).json({ message: "No songs found", songs: [] });
    }

    res.status(200).json(songs);
  } catch (error) {
    console.error("Error fetching featured songs:", error);
    res.status(500).json({ message: "Server error while fetching songs", error: error.message });
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
    try {

        // get 4 random songs from the database and send them to the client as a response using aggregate pipeline  
        const songs = await Song.aggregate([
        { $sample: { size: 4 } },
        {
            $project: {
            title: 1,
            artist: 1,
            imageUrl: 1,
            audioUrl: 1,
            duration: 1,
            },
        },
        ]);
        res.status(200).send(songs);
    } catch (error) {
        console.error(error);
        next(error);
    }
    }


export const getTredingSongs = async (req, res, next) => {
    try {
        // get 4 random songs from the database and send them to the client as a response using aggregate pipeline
        const songs = await Song.aggregate([
        { $sample: { size: 4 } },
        {
            $project: {
            title: 1,
            artist: 1,
            imageUrl: 1,
            audioUrl: 1,
            duration: 1,
            },
        },
        ]);
        res.status(200).send(songs);
    } catch (error) {
        console.error(error);
        next(error);
    }
    }