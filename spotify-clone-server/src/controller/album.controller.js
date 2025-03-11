import { Album } from '../models/album.model.js';

export const getAllAlbums = async (req, res, next) => {
    console.log('get all albums');
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
    console.log('get album by id');
    try{
        const {id} = req.params;
        console.log('get album by id', id);
        const album = await Album.findById(id).populate('songs');
        if(!album){
            return res.status(404).send('Album not found');
        }
        res.status(200).send(album);
    }catch(error){
        console.error(error);
        next(error);
    }
}
