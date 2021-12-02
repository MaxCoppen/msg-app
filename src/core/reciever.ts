import * as net from "net";
import User from "./user";
import pip from "public-ip";
import { ipToKey, keyToIP } from "./base95";

type OnDataEvent = (data: string) => void;

export default class NodeReciever {

    server: net.Server;

    constructor(user: User, ondata: OnDataEvent) {
        this.server = net.createServer(function(socket) {
            socket.addListener('error', (err) => {
                console.log('socket error: ' + err);
            });
            socket.on('data', function(chunk) {
                ondata(chunk.toString());
            });
        });

        this.server.listen(0, async () => {
            const ipv4 = await pip.v4();
            const port = (this.server.address() as any).port;
            console.log('Listening on port ' + port);
            console.log('Address : ' + ipv4 + ':' + port);
            const key = ipToKey(ipv4, port);
            console.log('Friend key : ' + key);
            console.log('Decoded Friend key : ' + keyToIP(key));
        });
    }
}