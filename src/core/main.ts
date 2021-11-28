import * as readline from "readline";
import NodeListener from "./reciever";
import NodeSender from "./sender";
import User from "./user";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let sender: NodeSender;
let reciever: NodeListener;

const user = new User(rl, () => {

  // Create the reciever/server
  reciever = new NodeListener(user, (data) => {
    if (data.toString().split('|').length > 0 && data.toString().split('|')[0] === "Connected") {
        console.log(`User '${data.toString().split('|')[1]}' Connected`);

        if (sender.connected == false)
        {
          sender.reconnect(user);
        }

        return;
    }
    console.log('Recieved: ' + data);
  });

  // Create the sender/client
  sender = new NodeSender(user, () => {
    rl.on('line', (line) => {
      sender.sendData(line);
    })
  });

});

export class Test {
  test: string = "test";

  constructor(test: string) {
    this.test = test;
  }
}