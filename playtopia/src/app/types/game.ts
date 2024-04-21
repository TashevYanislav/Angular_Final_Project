export interface gameForm {
  game_name: string;
  game_img: string;
  description: string;
  genre: string;
  price: number;
}

export interface game {
  _ownerId: string;
  game_name: string;
  game_img: string;
  description: string;
  genre: string;
  price: number;
  _createdOn: number;
  _id: string;
}

export interface cartGame {
  details_id: string;
  gameDescription: string;
  gameGenre: string;
  gameImage: string;
  gameName: string;
  gamePrice: number;
  _createdOn: number;
  _id: string;
  _ownerId: string;
}

export interface like {
  _id: string;
  _ownerId: string;
}
