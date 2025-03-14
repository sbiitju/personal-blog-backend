import { Types } from "mongoose";

export interface IAdmin {
    user : Types.ObjectId;
    name : string;
    email : string;
    phone : string;
    domain : string;               
}