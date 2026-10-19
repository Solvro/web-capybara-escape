import type {
  ReserveRoomCodeResponse,
  RoomLookupResponse,
} from "@capybara/shared";

import api from "./api";

const RoomsApi = {
  async reserveRoomCode(): Promise<string> {
    const response = await api.post<ReserveRoomCodeResponse>("/api/rooms/code");
    return response.data.code;
  },

  async getRoomByCode(code: string): Promise<RoomLookupResponse> {
    const response = await api.get<RoomLookupResponse>(
      `/api/rooms/${encodeURIComponent(code)}`,
    );
    return response.data;
  },
};

export default RoomsApi;
