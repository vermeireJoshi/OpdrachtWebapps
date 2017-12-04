import { Image } from './Image';

export class Product {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: Number;
  image: Image;
  liked: Boolean;

  constructor(name: string, category: string, description: string, price: Number, _id: string, image: Image) {
    this.name = name;
    this.category = category;
    this.description = description;
    this.price = price;
    this._id = _id;
    this.image = image;
    this.liked = false;
  };
}