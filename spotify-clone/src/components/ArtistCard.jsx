import React from "react";
import pritam from "../assets/pritam.jpeg";
import arijit from "../assets/arjitsingh.jpeg";
import arrahman from "../assets/arrehman.jpeg";
import sachinjigar from "../assets/sachin-jigar.jpeg";
import vishalshekhar from "../assets/vishal.jpeg";

const ArtistCard = ({ artist }) => {
  return (
    <div className="flex flex-col items-center text-white cursor-pointer">
      <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden group">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            ▶
          </button>
        </div>
      </div>
      <p className="mt-2 text-lg font-semibold">{artist.name}</p>
      <p className="text-sm text-gray-400">Artist</p>
    </div>
  );
};

const ArtistList = () => {
  const artists = [
    {
      name: "Pritam",
      image: pritam,
    },
    {
      name: "Arijit Singh",
      image: arijit,
    },
    {
      name: "A.R. Rahman",
      image: arrahman,
    },
    {
      name: "Sachin-Jigar",
      image:  sachinjigar,
    },
    {
      name: "Vishal-Shekhar",
      image: vishalshekhar,
    },
  ];

  return (
    <div className="flex justify-center gap-6 p-6 bg-black">
      {artists.map((artist, index) => (
        <ArtistCard key={index} artist={artist} />
      ))}
    </div>
  );
};

export default ArtistList;
