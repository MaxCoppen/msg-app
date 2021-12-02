const rice = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$#";

export function ipToKey(ip: string, port: number): string {
    const parts = ip.split(".");
    let res = 0;

    res += parseInt(parts[0], 10) << 24;
    res += parseInt(parts[1], 10) << 16;
    res += parseInt(parts[2], 10) << 8;
    res += parseInt(parts[3], 10);

    let bits = (res).toString(2) + (port).toString(2);

    let key = "";
    for (let i = 0; i < bits.length; i+=6) {
        let word = bits.substr(i, 6);

        for (let j = 0; j < 6; j++) {
            if (word.length <= j) word += '0';
        }

        key += rice[Number.parseInt(word, 2)];
    }

    return key;
}

export function keyToIP(key: string): string {
    let bits = "";
    for (let i = 0; i < key.length; i++) {
        const index = rice.indexOf(key[i]);
        let word = (index).toString(2);
        for (let j = 0; j < 6; j++) {
            if (word.length <= j) word = '0' + word;
        }
        bits += word;
    }

    const ipbits = bits.slice(0, 31);
    const portbits = bits.slice(31, bits.length - 1);

    const part1 = parseInt(ipbits.slice(0, 7), 2);
    const part2 = parseInt(ipbits.slice(8, 15), 2);
    const part3 = parseInt(ipbits.slice(16, 23), 2);
    const part4 = parseInt(ipbits.slice(24, 31), 2);

    const port = parseInt(portbits, 2);

    return [part1, part2, part3, part4].join('.') + ':' + port;
}