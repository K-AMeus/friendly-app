import apiClient from './apiClient';

export interface FriendDto {
  id: string;
  name: string;
  streak: number;
  lastContacted: Date;
  contactFrequency: number;
  groupId: string;
  createdAt: Date;
}

export interface CreateFriendDto {
  name: string;
  contactFrequency: number;
  groupId?: string;
}

export interface UpdateFriendDto {
  name: string;
  contactFrequency: number;
  groupId: string;
}

export const getFriends = async (groupId?: string): Promise<FriendDto[]> => {
  if (groupId) {
    return await apiClient.get(
      `/api/v1/friend-service/friends?groupId=${groupId}`,
    );
  }

  return await apiClient.get(`/api/v1/friend-service/friends`);
};

export const addFriend = async (
  friend: CreateFriendDto,
): Promise<FriendDto> => {
  return await apiClient.post(`/api/v1/friend-service/friends`, friend);
};

export const updateFriend = async (
  friendId: string,
  friend: UpdateFriendDto,
): Promise<FriendDto> => {
  return await apiClient.put(
    `/api/v1/friend-service/friends/${friendId}`,
    friend,
  );
};

export const deleteFriend = async (friendId: string): Promise<void> => {
  await apiClient.delete(`/api/v1/friend-service/friends/${friendId}`);
};
