import { Album } from '../models/album.model.js';
import { Song } from '../models/song.model.js';
import cloudinary from '../lib/cloudinary.js';


const uploadToCloudinary = async (file) => {
    try{
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'spotify-clone',
            resource_type: 'auto',
        });
        return result.secure_url;
    }catch(error){
        console.error(error);
        throw new Error('File upload failed');
    }
}

export const getAdmin = (req, res) => {
    res.send('Hello This Admin Routes!');
}

export const createSong = async (req, res, next) => {
    try{
        if(!req.files || !req.files.audioFile || !req.files.imageFiles){
            return res.status(400).send('Please upload audio and image files');
        }
        const audioFile = req.files.audioFile;
        const imageFiles = req.files.imageFiles;

        const audioUrl =  await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFiles);

        // const audioFileName = audioFile.name;

        const song = new Song({
            title: req.body.title,
            artist: req.body.artist,
            imageUrl: imageUrl,
            audioUrl: audioUrl,
            duration: req.body.duration,
            albumId: req.body.albumId || null,
        });

        await song.save();

        //if song has albumId, then add song to album
        if(req.body.albumId){
            const album = await Album.findByIdAndUpdate(req.body.albumId, {
                $push: {songs: song._id},
            });
            album.songs.push(song._id);
            await album.save();
        }

        res.status(201).send(song);

    }catch(error){
        console.error(error);
        next(error);
    }
}