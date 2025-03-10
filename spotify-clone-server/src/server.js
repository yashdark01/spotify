import { Song } from "./models/song.model.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Album } from "./models/album.model.js";

dotenv.config();

// const Songs = [
//   {
//     title: "Stay With Me",
//     artist: "Chainsmokers",
//     imageUrl: "/cover-images/1.jpg",
//     audioUrl: "/audio/1.mp3",
//     duration: 3.5,
//   },
//   {
//     title: "Closer",
//     artist: "Chainsmokers",
//     imageUrl: "/cover-images/2.jpg",
//     audioUrl: "/audio/2.mp3",
//     duration: 4.1,
//   },
//   {
//     title: "Shape of You",
//     artist: "Ed Sheeran",
//     imageUrl: "/cover-images/3.jpg",
//     audioUrl: "/audio/3.mp3",
//     duration: 3.9,
//   },
//   {
//     title: "Blinding Lights",
//     artist: "The Weeknd",
//     imageUrl: "/cover-images/4.jpg",
//     audioUrl: "/audio/4.mp3",
//     duration: 3.8,
//   },
//   {
//     title: "Dance Monkey",
//     artist: "Tones and I",
//     imageUrl: "/cover-images/5.jpg",
//     audioUrl: "/audio/5.mp3",
//     duration: 3.7,
//   },
//   {
//     title: "Someone You Loved",
//     artist: "Lewis Capaldi",
//     imageUrl: "/cover-images/6.jpg",
//     audioUrl: "/audio/6.mp3",
//     duration: 3.2,
//   },
//   {
//     title: "Bad Guy",
//     artist: "Billie Eilish",
//     imageUrl: "/cover-images/7.jpg",
//     audioUrl: "/audio/7.mp3",
//     duration: 3.4,
//   },
//   {
//     title: "Watermelon Sugar",
//     artist: "Harry Styles",
//     imageUrl: "/cover-images/8.jpg",
//     audioUrl: "/audio/8.mp3",
//     duration: 3.0,
//   },
//   {
//     title: "Don't Start Now",
//     artist: "Dua Lipa",
//     imageUrl: "/cover-images/9.jpg",
//     audioUrl: "/audio/9.mp3",
//     duration: 3.3,
//   },
//   {
//     title: "Circles",
//     artist: "Post Malone",
//     imageUrl: "/cover-images/10.jpg",
//     audioUrl: "/audio/10.mp3",
//     duration: 3.6,
//   },
//   {
//     title: "Memories",
//     artist: "Maroon 5",
//     imageUrl: "/cover-images/11.jpg",
//     audioUrl: "/audio/11.mp3",
//     duration: 3.1,
//   },
//   {
//     title: "Before You Go",
//     artist: "Lewis Capaldi",
//     imageUrl: "/cover-images/12.jpg",
//     audioUrl: "/audio/12.mp3",
//     duration: 3.7,
//   },
//   {
//     title: "Everything I Wanted",
//     artist: "Billie Eilish",
//     imageUrl: "/cover-images/13.jpg",
//     audioUrl: "/audio/13.mp3",
//     duration: 4.0,
//   },
//   {
//     title: "Adore You",
//     artist: "Harry Styles",
//     imageUrl: "/cover-images/14.jpg",
//     audioUrl: "/audio/14.mp3",
//     duration: 3.5,
//   },
//   {
//     title: "Physical",
//     artist: "Dua Lipa",
//     imageUrl: "/cover-images/15.jpg",
//     audioUrl: "/audio/15.mp3",
//     duration: 3.4,
//   },
//   {
//     title: "Sunflower",
//     artist: "Post Malone",
//     imageUrl: "/cover-images/16.jpg",
//     audioUrl: "/audio/16.mp3",
//     duration: 2.9,
//   },
//   {
//     title: "Girls Like You",
//     artist: "Maroon 5",
//     imageUrl: "/cover-images/17.jpg",
//     audioUrl: "/audio/17.mp3",
//     duration: 3.8,
//   },
//   {
//     title: "Lose You To Love Me",
//     artist: "Selena Gomez",
//     imageUrl: "/cover-images/18.jpg",
//     audioUrl: "/audio/18.mp3",
//     duration: 3.6,
//   },
//   {
//     title: "Señorita",
//     artist: "Shawn Mendes",
//     imageUrl: "/cover-images/19.jpg",
//     audioUrl: "/audio/19.mp3",
//     duration: 3.2,
//   },
//   {
//     title: "7 Rings",
//     artist: "Ariana Grande",
//     imageUrl: "/cover-images/20.jpg",
//     audioUrl: "/audio/20.mp3",
//     duration: 3.0,
//   },
//   {
//     title: "Old Town Road",
//     artist: "Lil Nas X",
//     imageUrl: "/cover-images/21.jpg",
//     audioUrl: "/audio/21.mp3",
//     duration: 2.9,
//   },
//   {
//     title: "Shallow",
//     artist: "Lady Gaga",
//     imageUrl: "/cover-images/22.jpg",
//     audioUrl: "/audio/22.mp3",
//     duration: 3.5,
//   },
//   {
//     title: "Thank U, Next",
//     artist: "Ariana Grande",
//     imageUrl: "/cover-images/23.jpg",
//     audioUrl: "/audio/23.mp3",
//     duration: 3.4,
//   },
//   {
//     title: "High Hopes",
//     artist: "Panic! At The Disco",
//     imageUrl: "/cover-images/24.jpg",
//     audioUrl: "/audio/24.mp3",
//     duration: 3.1,
//   },
//   {
//     title: "Sweet but Psycho",
//     artist: "Ava Max",
//     imageUrl: "/cover-images/25.jpg",
//     audioUrl: "/audio/25.mp3",
//     duration: 3.3,
//   },
//   {
//     title: "Without Me",
//     artist: "Halsey",
//     imageUrl: "/cover-images/26.jpg",
//     audioUrl: "/audio/26.mp3",
//     duration: 3.4,
//   },
//   {
//     title: "Sucker",
//     artist: "Jonas Brothers",
//     imageUrl: "/cover-images/27.jpg",
//     audioUrl: "/audio/27.mp3",
//     duration: 3.2,
//   },
//   {
//     title: "If I Can't Have You",
//     artist: "Shawn Mendes",
//     imageUrl: "/cover-images/28.jpg",
//     audioUrl: "/audio/28.mp3",
//     duration: 3.1,
//   },
//   {
//     title: "Truth Hurts",
//     artist: "Lizzo",
//     imageUrl: "/cover-images/29.jpg",
//     audioUrl: "/audio/29.mp3",
//     duration: 3.0,
//   },
//   {
//     title: "Beautiful People",
//     artist: "Ed Sheeran",
//     imageUrl: "/cover-images/30.jpg",
//     audioUrl: "/audio/30.mp3",
//     duration: 3.3,
//   },
// ];

const createdSongs = [
    {
        title: "Starboy",
        artist: "The Weeknd", 
        imageUrl: "/cover-images/1.jpg",
        audioUrl: "/audio/1.mp3",
        duration: 3.8
    },
    {
        title: "Uptown Funk",
        artist: "Mark Ronson",
        imageUrl: "/cover-images/2.jpg",
        audioUrl: "/audio/2.mp3", 
        duration: 4.3
    },
    {
        title: "Rolling in the Deep",
        artist: "Adele",
        imageUrl: "/cover-images/3.jpg",
        audioUrl: "/audio/3.mp3",
        duration: 3.9
    },
    {
        title: "Despacito",
        artist: "Luis Fonsi",
        imageUrl: "/cover-images/4.jpg",
        audioUrl: "/audio/4.mp3",
        duration: 3.8
    },
    {
        title: "Shake It Off",
        artist: "Taylor Swift",
        imageUrl: "/cover-images/5.jpg",
        audioUrl: "/audio/5.mp3",
        duration: 3.6
    },
    {
        title: "Happy",
        artist: "Pharrell Williams",
        imageUrl: "/cover-images/6.jpg",
        audioUrl: "/audio/6.mp3",
        duration: 3.5
    },
    {
        title: "Royals",
        artist: "Lorde",
        imageUrl: "/cover-images/7.jpg",
        audioUrl: "/audio/7.mp3",
        duration: 3.2
    },
    {
        title: "Can't Stop the Feeling",
        artist: "Justin Timberlake",
        imageUrl: "/cover-images/8.jpg",
        audioUrl: "/audio/8.mp3",
        duration: 3.9
    },
    {
        title: "Roar",
        artist: "Katy Perry",
        imageUrl: "/cover-images/9.jpg",
        audioUrl: "/audio/9.mp3",
        duration: 3.4
    },
    {
        title: "Counting Stars",
        artist: "OneRepublic",
        imageUrl: "/cover-images/10.jpg",
        audioUrl: "/audio/10.mp3",
        duration: 4.2
    },
    {
        title: "All of Me",
        artist: "John Legend",
        imageUrl: "/cover-images/11.jpg",
        audioUrl: "/audio/11.mp3",
        duration: 4.1
    },
    {
        title: "Chandelier",
        artist: "Sia",
        imageUrl: "/cover-images/12.jpg",
        audioUrl: "/audio/12.mp3",
        duration: 3.6
    },
    {
        title: "See You Again",
        artist: "Wiz Khalifa",
        imageUrl: "/cover-images/13.jpg",
        audioUrl: "/audio/13.mp3",
        duration: 3.7
    },
    {
        title: "Sugar",
        artist: "Maroon 5",
        imageUrl: "/cover-images/14.jpg",
        audioUrl: "/audio/14.mp3",
        duration: 3.5
    },
    {
        title: "Thinking Out Loud",
        artist: "Ed Sheeran",
        imageUrl: "/cover-images/15.jpg",
        audioUrl: "/audio/15.mp3",
        duration: 4.4
    },
    {
        title: "Sorry",
        artist: "Justin Bieber",
        imageUrl: "/cover-images/16.jpg",
        audioUrl: "/audio/16.mp3",
        duration: 3.3
    },
    {
        title: "Cheap Thrills",
        artist: "Sia",
        imageUrl: "/cover-images/17.jpg",
        audioUrl: "/audio/17.mp3",
        duration: 3.5
    },
    {
        title: "Work",
        artist: "Rihanna",
        imageUrl: "/cover-images/18.jpg",
        audioUrl: "/audio/18.mp3",
        duration: 3.4
    },
    {
        title: "Hello",
        artist: "Adele",
        imageUrl: "/cover-images/19.jpg",
        audioUrl: "/audio/19.mp3",
        duration: 4.6
    },
    {
        title: "Love Yourself",
        artist: "Justin Bieber",
        imageUrl: "/cover-images/20.jpg",
        audioUrl: "/audio/20.mp3",
        duration: 3.5
    },
    {
        title: "Bad Guy",
        artist: "Billie Eilish",
        imageUrl: "/cover-images/21.jpg",
        audioUrl: "/audio/21.mp3",
        duration: 3.4
    },
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        imageUrl: "/cover-images/22.jpg",
        audioUrl: "/audio/22.mp3",
        duration: 3.8
    },
    {
        title: "Don't Start Now",
        artist: "Dua Lipa",
        imageUrl: "/cover-images/23.jpg",
        audioUrl: "/audio/23.mp3",
        duration: 3.3
    },
    {
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        imageUrl: "/cover-images/24.jpg",
        audioUrl: "/audio/24.mp3",
        duration: 3.0
    },
    {
        title: "Positions",
        artist: "Ariana Grande",
        imageUrl: "/cover-images/25.jpg",
        audioUrl: "/audio/25.mp3",
        duration: 2.9
    },
    {
        title: "Levitating",
        artist: "Dua Lipa",
        imageUrl: "/cover-images/26.jpg",
        audioUrl: "/audio/26.mp3",
        duration: 3.5
    },
    {
        title: "drivers license",
        artist: "Olivia Rodrigo",
        imageUrl: "/cover-images/27.jpg",
        audioUrl: "/audio/27.mp3",
        duration: 4.0
    },
    {
        title: "Stay",
        artist: "The Kid LAROI",
        imageUrl: "/cover-images/28.jpg",
        audioUrl: "/audio/28.mp3",
        duration: 2.8
    },
    {
        title: "good 4 u",
        artist: "Olivia Rodrigo",
        imageUrl: "/cover-images/29.jpg",
        audioUrl: "/audio/29.mp3",
        duration: 3.2
    },
    {
        title: "Save Your Tears",
        artist: "The Weeknd",
        imageUrl: "/cover-images/30.jpg",
        audioUrl: "/audio/30.mp3",
        duration: 3.5
    },
    {
        title: "Kiss Me More",
        artist: "Doja Cat",
        imageUrl: "/cover-images/31.jpg",
        audioUrl: "/audio/31.mp3",
        duration: 3.7
    },
    {
        title: "Peaches",
        artist: "Justin Bieber",
        imageUrl: "/cover-images/32.jpg",
        audioUrl: "/audio/32.mp3",
        duration: 3.4
    },
    {
        title: "Leave The Door Open",
        artist: "Silk Sonic",
        imageUrl: "/cover-images/33.jpg",
        audioUrl: "/audio/33.mp3",
        duration: 3.8
    },
    {
        title: "Montero",
        artist: "Lil Nas X",
        imageUrl: "/cover-images/34.jpg",
        audioUrl: "/audio/34.mp3",
        duration: 2.9
    },
    {
        title: "Butter",
        artist: "BTS",
        imageUrl: "/cover-images/35.jpg",
        audioUrl: "/audio/35.mp3",
        duration: 2.7
    },
    {
        title: "Heat Waves",
        artist: "Glass Animals",
        imageUrl: "/cover-images/36.jpg",
        audioUrl: "/audio/36.mp3",
        duration: 3.9
    },
    {
        title: "Industry Baby",
        artist: "Lil Nas X",
        imageUrl: "/cover-images/37.jpg",
        audioUrl: "/audio/37.mp3",
        duration: 3.5
    },
    {
        title: "Happier Than Ever",
        artist: "Billie Eilish",
        imageUrl: "/cover-images/38.jpg",
        audioUrl: "/audio/38.mp3",
        duration: 5.1
    },
    {
        title: "Easy On Me",
        artist: "Adele",
        imageUrl: "/cover-images/39.jpg",
        audioUrl: "/audio/39.mp3",
        duration: 3.7
    },
    {
        title: "Shivers",
        artist: "Ed Sheeran",
        imageUrl: "/cover-images/40.jpg",
        audioUrl: "/audio/40.mp3",
        duration: 3.3
    }
];

const Albums = [
    {
        title: "The Weeknd Hits",
        artist: "The Weeknd", 
        imageUrl: "/album-covers/1.jpg",
        songs: createdSongs.slice(0, 4).map((song)=>song._id),
        releaseYear: 2020
    },
    {
        title: "Pop Essentials",
        artist: "Various Artists",
        imageUrl: "/album-covers/2.jpg", 
        songs: createdSongs.slice(4, 7).map((song)=>song._id),
        releaseYear: 2019
    },
    {
        title: "Chart Toppers",
        artist: "Various Artists",
        imageUrl: "/album-covers/3.jpg",
        songs: createdSongs.slice(7, 14).map((song)=>song._id),
        releaseYear: 2020
    },
    {
        title: "Sia Collection", 
        artist: "Sia",
        imageUrl: "/album-covers/4.jpg",
        songs: createdSongs.slice(14, 17).map((song)=>song._id),
        releaseYear: 2019
    },
    {
        title: "Summer Hits",
        artist: "Various Artists",
        imageUrl: "/album-covers/5.jpg",
        songs: createdSongs.slice(17, 19).map((song)=>song._id),
        releaseYear: 2019
    },
    {
        title: "Love Songs",
        artist: "Various Artists", 
        imageUrl: "/album-covers/6.jpg",
        songs: createdSongs.slice(19, 22).map((song)=>song._id),
        releaseYear: 2020
    },
    {
        title: "New Generation",
        artist: "Various Artists",
        imageUrl: "/album-covers/7.jpg",
        songs: createdSongs.slice(22, 25).map((song)=>song._id),
        releaseYear: 2021
    },
    {
        title: "Dance Pop",
        artist: "Various Artists",
        imageUrl: "/album-covers/8.jpg",
        songs: createdSongs.slice(25, 30).map((song)=>song._id),
        releaseYear: 2021
    },
    {
        title: "2021 Hits",
        artist: "Various Artists",
        imageUrl: "/album-covers/9.jpg",
        songs: createdSongs.slice(30, 34).map((song)=>song._id),
        releaseYear: 2021
    },
    {
        title: "Latest & Greatest",
        artist: "Various Artists",
        imageUrl: "/album-covers/10.jpg",
        songs: createdSongs.slice(34, 40).map((song)=>song._id),
        releaseYear: 2021
    }
];


const uploadSongs = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
    console.log("Database connected!");

    // Clear existing songs before inserting
    await Song.deleteMany({});
    await Album.deleteMany({});

    await Song.insertMany(createdSongs);
    await Album.insertMany(Albums);


    console.log(`Successfully uploaded ${createdSongs.length} songs and ${Albums.length}`);
  } catch (error) {
    console.error("Error uploading songs:", error.message);
    throw error; // Re-throw to handle in calling code
    process.exit(1);
    if (connection) {
      if (mongoose.connection.readyState === 1) {
        await mongoose.disconnect();
      }
    }
  }
};

uploadSongs();
