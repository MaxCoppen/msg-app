import * as net from "net";
import User from "./user";

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

        this.server.listen(user.port);
    }
}