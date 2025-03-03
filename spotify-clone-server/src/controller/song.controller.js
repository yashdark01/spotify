import { Song } from '../models/song.model.js';

export const getAllSongs = async (req, res, next) => {


    // -1  means descending order newest to oldest
    // 1 means ascending order oldest to newest
    try{
        const songs = await Song.find().sort({createdAt: -1});
        res.status(200).send(songs);
    }catch(error){
        console.error(error);
        next(error);
    }
}

export const getSongById = async (req, res, next) => {
    try{
        const {id} = req.params;

        const song = await Song.findById(id);
        if(!song){
            return res.status(404).send('Song not found');
        }
        res.status(200).send(song);
    }catch{
        console.error(error);
        next(error);
    }
}
