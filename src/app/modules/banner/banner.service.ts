import { TImageFile } from '../../interface/image.interface';
import { IBanner } from './banner.interface';
import { Banner } from './banner.model';

const createBannerIntoDb = async (file: TImageFile, domain: string) => {
  let payload: IBanner = { image: '', domain: '' };
  if (file && domain) {
    payload.image = file.path;
    payload.domain = domain;
  }
  const result = await Banner.create(payload);
  return result;
};

export const BannerServices = {
  createBannerIntoDb,
};
