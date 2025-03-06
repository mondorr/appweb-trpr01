import type { Vinyl } from "./types";

const vinyl1: Vinyl = {
  id: "11475f18-1174-4b1d-a58b-aff1308b7b64",
  album: "Blonde",
  artist: "Frank Ocean",
  price: 40,
  coverURL:
    "https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/Blonde_-_Frank_Ocean.jpeg/220px-Blonde_-_Frank_Ocean.jpeg",
  stock: 10,
  description: "Blonde est le deuxième album studio de Frank Ocean, sorti le 20 août 2018",
  releaseYear: 2018,
};

const vinyl2: Vinyl = {
  id: "d8a3c0b8-4f5c-4b1f-8d5d-0e6c3c1b6b1e",
  album: "We Are Not Your Kind",
  artist: "Slipknot",
  price: 55,
  coverURL: "https://upload.wikimedia.org/wikipedia/en/1/18/Slipknot_-_We_Are_Not_Your_Kind.png",
  stock: 144,
  description: "We Are Not Your Kind est le sixième album studio du groupe de nu metal américain Slipknot, sorti le 9 août 2019",
  releaseYear: 2019,
};

const vinyl3: Vinyl = {
  id: "e1f1e1a4-3a3f-4d3d-8c3c-1e1a1e1f1e1a",
  album: "Holy Hell",
  artist: "Architects",
  price: 45,
  coverURL: "https://upload.wikimedia.org/wikipedia/en/9/9c/Architectsalbum8cover.jpg",
  stock: 53,
  description: "Holy Hell est le huitième album studio du groupe britannique Architects, sorti le 9 novembre 2018",
  releaseYear: 2018,
};

const vinyl4: Vinyl = {
  id: "f1e1a1e1-1a1e-1a1e-1a1e-1a1e1a1e1a1e",
  album: "Stick Season",
  artist: "Noah Kahan",
  price: 30,
  coverURL: "https://upload.wikimedia.org/wikipedia/en/1/13/Noah_Kahan_-_Stick_Season.png",
  stock: 1,
  description: "Stick Season est le premier album studio de Noah Kahan, sorti le 15 janvier 2021",
  releaseYear: 2021,
};

const vinyl5: Vinyl = {
  id: "qwerty123-2b2e-2b2e-2b2e-2b2e2b2e2b2e",
  album: "Take Me Back to Eden",
  artist: "Sleep Token",
  price: 40,
  coverURL: "https://upload.wikimedia.org/wikipedia/en/4/48/SleepTokenTMBTE.jpg",
  stock: 372,
  description: "Take Me Back to Eden est le troisième album studio de Sleep Token.",
  releaseYear: 2023,
};

const vinyl6: Vinyl = {
  id: "mnop1122-6f6e-6f6e-6f6e-6f6e6f6e6f6e",
  album: "Call Me If You Get Lost",
  artist: "Tyler, the Creator",
  price: 42,
  coverURL: "https://upload.wikimedia.org/wikipedia/en/d/d3/Call_Me_If_You_Get_Lost_album_cover.jpg",
  stock: 123,
  description: "Call Me If You Get Lost est le sixième album studio de Tyler, the Creator.",
  releaseYear: 2021,
};

const vinyl7: Vinyl = {
  id: "qrst3344-7g7e-7g7e-7g7e-7g7e7g7e7g7e",
  album: "Mr. Morale & The Big Steppers",
  artist: "Kendrick Lamar",
  price: 50,
  coverURL: "https://images.genius.com/2f8cae9b56ed9c643520ef2fd62cd378.1000x1000x1.png",
  stock: 0,
  description: "Mr. Morale & The Big Steppers est le cinquième album studio de Kendrick Lamar.",
  releaseYear: 2022,
};

export const initialVinyls: Vinyl[] = [vinyl1, vinyl2, vinyl3, vinyl4, vinyl5, vinyl6, vinyl7];
