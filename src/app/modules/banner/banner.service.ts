import { TImageFile } from '../../interface/image.interface';
import { IBanner } from './banner.interface';
import { Banner } from './banner.model';

const createBannerIntoDb = async (file: TImageFile, domain: string) => {
  let payload: IBanner = { image: '', domain: '' };
  if (file && domain) {
    payload.image = file.path;
    payload.domain = domain;
  }
  console.log(payload)
  const result = await Banner.create(payload);
  return result;
};

const getAllBanner = async (domain: string) => {
  const result = Banner.find({
    domain: domain,
  });
  return result;
};

const deleteBanner = async (id: string) => {
  const result = await Banner.findByIdAndDelete(id);
  return result;
};

export const BannerServices = {
  createBannerIntoDb,
  deleteBanner,
  getAllBanner,
};
