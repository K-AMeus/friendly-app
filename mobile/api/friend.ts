import apiClient from './apiClient';

export interface FriendDto {
  id: string;
  firstName: string;
  lastName: string;
}

export interface CreateFriendDto {
  firstName: string;
  lastName: string;
}

export interface UpdateFriendDto {
  firstName: string;
  lastName: string;
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
