import * as net from "net";
import User from "./user";

type OnConnectEvent = () => void;

export default class NodeSender {

    socket?: net.Socket;
    connected: boolean = false;
    onconnect: OnConnectEvent;

    constructor(user: User, address: string, port: number, onconnect: OnConnectEvent) {
        this.onconnect = onconnect;
        this.reconnect(user, address, port);
    }

    sendData(data: string) {
        if (this.socket) {
            this.socket.write(data);
        }
    }

    reconnect(user: User, address: string, port: number) {
        const socket = new net.Socket();

        socket.on('error', (err) => {
            if (!err.message.includes("ECONNREFUSED")) {
                console.log(`Error Occured: ${err.message}`);
            }
        });

        socket.connect(port, address, () => {
            this.connected = true;
            socket.write(`Connected|${user.username}`);
            this.onconnect();
        });

        socket.on('close', () => {
            console.log('Connection closed');
            this.connected = false;
        });

        this.socket = socket;
    }
}