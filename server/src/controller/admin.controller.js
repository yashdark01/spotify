import { Album } from '../models/album.model.js';
import { Song } from '../models/song.model.js';
import cloudinary from '../lib/cloudinary.js';

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'music-player',
      resource_type: 'auto',
    });
    return result.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error('File upload failed');
  }
};

export const checkAdmin = (req, res) => {
  res.status(200).json({ admin: true });
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files?.audioFile || !req.files?.imageFile) {
      return res.status(400).send('Please upload audio and image files');
    }

    const { title, artist, duration, albumId } = req.body;

    const audioUrl = await uploadToCloudinary(req.files.audioFile);
    const imageUrl = await uploadToCloudinary(req.files.imageFile);

    const song = new Song({
      title,
      artist,
      imageUrl,
      audioUrl,
      duration: Number(duration),
      albumId: albumId || null,
    });

    await song.save();

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    res.status(201).send(song);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).send('Song not found');
    }

    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await Song.findByIdAndDelete(id);
    res.status(200).send({ message: 'Song deleted successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    if (!req.files?.imageFile) {
      return res.status(400).send('Please upload an image file');
    }

    const { title, artist, releaseYear } = req.body;
    const imageUrl = await uploadToCloudinary(req.files.imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear: Number(releaseYear),
    });

    await album.save();
    res.status(201).send(album);
  } catch (error) {
    console.error('Error in create album ', error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id);
    if (!album) {
      return res.status(404).send('Album not found');
    }

    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
    res.status(200).send({ message: 'Album deleted successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
