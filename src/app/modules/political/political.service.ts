import { Political } from './political.model';

const getClieintInfo = async (domain: string) => {
  const result = await Political.findOne({ domain }).populate('user');
  return result;
};

export const ClientServices = {
  getClieintInfo,
};
