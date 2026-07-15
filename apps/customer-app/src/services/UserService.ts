import { IUserService } from "./IUserService";
import { MockUserService } from "./MockUserService";

// Switch to a real ApiUserService implementation in production
export const UserService: IUserService = new MockUserService();
