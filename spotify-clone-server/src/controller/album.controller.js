import { Album } from '../models/album.model.js';

export const getAllAlbums = async (req, res, next) => {
    try{
        const albums = await Album.find();
        res.status(200).send(albums);
    }
    catch(error){
        console.error(error);
        next(error);
    }
    
}

export const getAlbumById = async (req, res, next) => {
    try{
        const {id} = req.params;

        const album = await Album.findById(id).populate('songs');
        if(!album){
            return res.status(404).send('Album not found');
        }
        res.status(200).send(album);
    }catch{
        console.error(error);
        next(error);
    }
}
