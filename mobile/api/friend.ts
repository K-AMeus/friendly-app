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
  groupId: string;
}

export interface UpdateFriendDto {
  name: string;
  contactFrequency: number;
  groupId: string;
}

export const getFriends = async (): Promise<FriendDto[]> => {
  return await apiClient.get(`/api/v1/friend-service/friends`);
};

export const AddFriend = async (
  friend: CreateFriendDto,
): Promise<FriendDto> => {
  return await apiClient.post(`/api/v1/friend-service/friends`, friend);
};

export const UpdateFriend = async (
  friendId: string,
  friend: UpdateFriendDto,
): Promise<FriendDto> => {
  return await apiClient.put(
    `/api/v1/friend-service/friends/${friendId}`,
    friend,
  );
};

export const DeleteFriend = async (friendId: string): Promise<void> => {
  await apiClient.delete(`/api/v1/friend-service/friends/${friendId}`);
};
