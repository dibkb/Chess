import { useAuthStore, useSocketStore } from "../store/auth";
import { OnlinePlayers } from "../types/socket";
import { User, SocketUser } from "../types/zustand";
import { axiosInstance } from "./apiInstance";
export const fetchUserData = async (input: OnlinePlayers[]): Promise<void> => {
  const { user } = useAuthStore.getState();
  const { setOnlineUsers } = useSocketStore.getState();
  const users = new Map<string, SocketUser>();
  const userIds = new Set<string>();

  // Filter and prepare data
  input.forEach(([userId, socketId]) => {
    if (userId && userId !== user?.id && !userIds.has(userId)) {
      users.set(userId, { id: userId, socketId });
      userIds.add(userId);
    }
  });

  // If no users to fetch, return empty map
  if (userIds.size === 0) {
    return;
  }

  // Prepare query string
  const reqQuery = Array.from(userIds)
    .map((id) => `userId=${id}`)
    .join("&");

  try {
    const response = await axiosInstance.get<{ users: User[] }>(
      `/user-info?${reqQuery}`
    );
    const data = response.data;
    // Update user information
    data.users.forEach((d) => {
      if (d.id && users.has(d.id)) {
        const existingUser = users.get(d.id)!;
        users.set(d.id, {
          ...existingUser,
          profilePic: d.profilePic,
          username: d.username,
        });
      }
    });
    setOnlineUsers(users);
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
