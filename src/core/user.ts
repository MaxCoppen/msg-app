import { ipcRenderer } from "electron";
import { keyToIP } from "./base95";
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
                    this.initConnection(this.peer + ':' + this.peerport);
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

    initConnection(key: string) {
        let address = key;
        if (!key.includes(':')) address = keyToIP(key);
        this.peer = address.split(':')[0];
        this.peerport = Number.parseInt(address.split(':')[1]);
        console.log('Connecting to ' + this.peer + ':' + this.peerport);
        this.sender = new NodeSender(this, this.peer, this.peerport, () => {
            console.log('Connected to client');
        });
    }
}