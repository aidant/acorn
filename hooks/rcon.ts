import TcpSocket from "react-native-tcp-socket";
import {
  createRconClient as _createRconClient,
  CreateRconClientOptions,
} from "@lazy/rcon/byo-transport-net";

export const createRconClient = (options: CreateRconClientOptions) => {
  return _createRconClient(options, TcpSocket.createConnection);
};
