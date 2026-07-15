import { UserProfile } from "../store/userStore";

export interface IUserService {
  getProfile(userId: string): Promise<UserProfile>;
  updateProfile(
    userId: string,
    updates: Partial<UserProfile>,
  ): Promise<UserProfile>;
  uploadAvatar(userId: string, imageUri: string): Promise<string>;
  loginWithPhone(phone: string): Promise<UserProfile>;
}
