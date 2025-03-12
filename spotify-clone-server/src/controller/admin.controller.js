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

export const checkAdmin = (req, res, next) => {

    console.log("admin");
    res.status(200).json({admin: true});
    // console.log("check admin successfully");
}

export const createSong = async (req, res, next) => {
    try{
        if(!req.files || !req.files.audioFile || !req.files.imageFiles){
            return res.status(400).send('Please upload audio and image files');
        }
        const {title, artist, duration, albumId} = req.body;

        const audioFile = req.files.audioFile;
        const imageFiles = req.files.imageFiles;

        const audioUrl =  await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFiles);

        const song = new Song({
            title: title,
            artist: artist,
            imageUrl: imageUrl,
            audioUrl: audioUrl,
            duration: duration,
            albumId: albumId || null,
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

export const deleteSong = async (req, res, next) => {
    try{
        const {id} = req.params;

        const song = await Song.findById(id);  
        if(!song){
            return res.status(404).send('Song not found');
        }


       //if song has albumId, then remove song from album
        if(song.albumId){
            const album = await Album.findByIdAndUpdate(song.albumId, {
                $pull:{songs:song._id},
            });
        }

        await song.findByIdAndDelete(id);
        res.status(200).send({message: 'Song deleted successfully'});
    }catch(error){
        console.error(error);
        next(error);
    }
}

export const createAlbum = async (req, res, next) => {
    try{
        if(!req.files || !req.files.imageFiles){
            return res.status(400).send('Please upload image files');
        }

        const {title, artist, releaseYear} = req.body;

        const {imageFile} = req.files;

        const imageUrl = await uploadToCloudinary(imageFile);

        const album = new Album({
            title: title,
            artist: artist,
            imageUrl: imageUrl,
            releaseYear: releaseYear,
        });

        await album.save();
        res.status(201).send(album);

    }catch(error){
        console.error("Error in create album ", error);
        next(error);
    }
}

export const deleteAlbum = async (req, res, next) => {
    try{
        const {id} = req.params;
        const album = await Album.findById(id);  
        if(!album){
            return res.status(404).send('Album not found');
        }

        await Song.deleteMany({albumId: id});
        await album.findByIdAndDelete(id);
        res.status(200).send({message: 'Album deleted successfully'});
    }catch(error){
        console.error(error);
        next(error);
    }
}