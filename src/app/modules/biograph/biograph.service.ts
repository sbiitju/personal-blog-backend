import { IBiograph } from './biograph.interface';
import { Biograph } from './biograph.model';

const createBiographIntoDb = async (payload: IBiograph) => {
  const result = await Biograph.create(payload);
  return result;
};

const getBiographFromDb = async (domain: string) => {
  const result = await Biograph.findOne({ domain });
  return result;
};

export const BiographService = {
  createBiographIntoDb,
  getBiographFromDb,
};
