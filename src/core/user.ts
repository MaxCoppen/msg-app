import { ipcRenderer } from "electron";
import UserNode from "./node";
import NodeReciever from "./reciever";
import NodeSender from "./sender";

export default class User {

    reciever?: NodeReciever;
    sender?: NodeSender;

    username: string = "";
    port: number = 0;

    constructor(username: string, port: number) {
        this.username = username;
        this.port = port;

        this.initReciever();
    }

    initReciever() {
        this.reciever = new NodeReciever(this, (data) => {
            if (data.toString().split('|').length > 0 && data.toString().split('|')[0] === "Connected") {
                console.log(`User '${data.toString().split('|')[1]}' Connected`);
                (global as any).peer = new UserNode(data.toString().split('|')[1]);
                ipcRenderer.send('connected', (global as any).peer);

                if (!this.sender)
                {
                    this.initConnection(this.peer, this.peerport);
                }
                else if (this.sender.connected == false) {
                    this.sender.reconnect(this, this.peer, this.peerport);
                }

                return;
            }

            ipcRenderer.send('recieved', data, (global as any).peer.username);
        });
    }

    peer: string = "";
    peerport: number = 0;

    initConnection(address: string, port: number) {
        this.peer = address;
        this.peerport = port;
        this.sender = new NodeSender(this, address, port, () => {
            console.log('Connected to client');
        });
    }
}