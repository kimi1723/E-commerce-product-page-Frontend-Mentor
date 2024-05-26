import { Types } from 'mongoose';

export const checkId = (id: string): boolean => !Types.ObjectId.isValid(id);
