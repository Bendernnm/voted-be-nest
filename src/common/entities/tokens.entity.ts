import { ObjectId } from 'mongodb';

export interface TokensEntity {
  userId: ObjectId;
  authToken: string;
  refreshToken: string;
}
