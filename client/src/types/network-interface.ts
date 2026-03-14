export interface INetworkInterface<OnMessageData> {
  readonly networkId: string | number;

  syncState: (data: OnMessageData) => void;
  destroy: (fromScene?: boolean) => void;
}
