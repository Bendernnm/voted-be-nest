import { ObjectId } from 'mongodb';

export interface UserEntity {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  image: string;
}
