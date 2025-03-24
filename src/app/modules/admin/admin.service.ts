import { Political } from '../political/political.model';
import { Admin } from './admin.model';

const getAllUsers = async () => {
  const [politicalUsers, adminUsers] = await Promise.all([
    Political.find().populate({ path: 'user', select: '-password' }),
    Admin.find().populate({ path: 'user', select: '-password' }),
  ]);

  const allUsers = [...politicalUsers, ...adminUsers];
  return allUsers;
};

export const AdminServices = {
  getAllUsers,
};
