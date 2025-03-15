import { IBiograph } from './biograph.interface';
import { Biograph } from './biograph.model';

const createBiographIntoDb = async (payload: IBiograph) => {
  const result = await Biograph.create(payload);
  return result;
};

export const BiographService = {
  createBiographIntoDb,
};
