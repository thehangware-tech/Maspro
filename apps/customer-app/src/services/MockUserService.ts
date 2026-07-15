import { IUserService } from "./IUserService";
import { UserProfile } from "../store/userStore";

const mockDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Using the default profile from store as our "backend DB"
let MOCK_DB: Record<string, UserProfile> = {
  user_demo: {
    id: "user_demo",
    name: "Rohit Kumar",
    email: "rohit@example.com",
    phone: "+91 98765 43210",
    dob: "12-10-1998",
    gender: "Male",
    memberSince: "2023-01-15T00:00:00.000Z",
    favoriteSports: ["cricket", "badminton"],
    addresses: [
      {
        id: "addr_1",
        name: "Rohit Kumar",
        phone: "+91 98765 43210",
        street: "123, 4th Cross, Koramangala",
        city: "Bangalore",
        state: "Karnataka",
        zipCode: "560034",
        isDefault: true,
        type: "home",
      },
    ],
  },
  guest: {
    id: "guest",
    name: "Guest User",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    memberSince: new Date().toISOString(),
    favoriteSports: [],
    addresses: [],
  },
};

export class MockUserService implements IUserService {
  async getProfile(userId: string): Promise<UserProfile> {
    await mockDelay(800);
    const user = MOCK_DB[userId];
    if (!user) {
      throw new Error("User not found");
    }
    return JSON.parse(JSON.stringify(user));
  }

  async updateProfile(
    userId: string,
    updates: Partial<UserProfile>,
  ): Promise<UserProfile> {
    await mockDelay(1000);
    const user = MOCK_DB[userId];
    if (!user) {
      throw new Error("User not found");
    }
    MOCK_DB[userId] = { ...user, ...updates };
    return JSON.parse(JSON.stringify(MOCK_DB[userId]));
  }

  async uploadAvatar(userId: string, imageUri: string): Promise<string> {
    await mockDelay(1200);
    const user = MOCK_DB[userId];
    if (!user) throw new Error("User not found");
    // In reality, upload to S3/Cloudinary and get URL. Here we just use the local URI.
    MOCK_DB[userId].avatar = imageUri;
    return imageUri;
  }

  async loginWithPhone(phone: string): Promise<UserProfile> {
    await mockDelay(1000);
    let user = Object.values(MOCK_DB).find(
      (u) => u.phone === phone && u.id !== "guest",
    );

    if (!user) {
      const newId = `user_${Date.now()}`;
      user = {
        id: newId,
        name: "New User",
        email: "",
        phone,
        dob: "",
        gender: "",
        memberSince: new Date().toISOString(),
        favoriteSports: [],
        addresses: [],
      };
      MOCK_DB[newId] = user;
    }
    return JSON.parse(JSON.stringify(user));
  }
}
