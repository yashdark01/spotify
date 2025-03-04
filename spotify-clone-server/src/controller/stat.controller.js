import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { User } from "../models/user.model.js";


export const  getAllStats = async (req, res, next) => {
    try{

        const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
            Song.countDocuments(),
            Album.countDocuments(),
            User.countDocuments(),

            Song.aggregate([
                {
                    $unionWith:{
                        coll : 'albums',
                        pipeline:[
                            {
                                $group:{
                                    _id: null,
                                    totalDuration: {$sum: '$duration'},
                                }
                            }
                        ]
                    }
    
                },
                {
                    $group:{
                        _id: "artist",
                    },    
                },
                {
                    $count: "count",
                },
            ]),
        ]);

        res.status(200).json({
            totalSongs,
            totalAlbums,
            totalUsers,
            totalArtist: uniqueArtists[0]?.count || 0,
        });

    }catch(error){
        console.error(error);
        next(error);
    }
}