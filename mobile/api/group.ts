import apiClient from './apiClient';

export interface GroupDto {
  id: string;
  name: string;
}

export interface CreateGroupDto {
  name: string;
}

export interface UpdateGroupDto {
  name: string;
}

export const getGroup = async (id: string): Promise<GroupDto> => {
  return await apiClient.get(`/api/v1/group-service/groups/${id}`);
};

export const getAllGroups = async (): Promise<GroupDto[]> => {
  return await apiClient.get('/api/v1/group-service/groups');
};

export const getAllByFilter = async (groupId: string): Promise<GroupDto[]> => {
  return await apiClient.get(`/api/v1/group-service/groups?groupId=${groupId}`);
};

export const createGroup = async (group: CreateGroupDto): Promise<GroupDto> => {
  return await apiClient.post('/api/v1/group-service/groups', group);
};

export const updateGroup = async (
  id: string,
  group: UpdateGroupDto,
): Promise<GroupDto> => {
  return await apiClient.put(`/api/v1/group-service/groups/${id}`, group);
};

export const deleteGroup = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/v1/group-service/groups/${id}`);
};
