import WebSocket from 'ws';

const peers = new Set<WebSocket>();
const state = {};
const server = new WebSocket.Server({
    port: 8081,
});

server.on('connection', (ws, request) => {
    peers.add(ws);

    ws.send(JSON.stringify({
        op: 'state',
        arg: state,
    }));

    ws.on('message', (data) => {
        let msg = JSON.parse(data.toString());

        if (msg.op == 'state') {
            Object.assign(state, msg.arg);

            for (let peer of peers) {
                if (peer != ws) {
                    peer.send(data);
                }
            }
        }
    });

    ws.on('close', (code, reason) => {
        peers.delete(ws);
    });
});

server.on('listening', () => {
    let value = server.address();
    let x;
    if (typeof value == 'string')
        x = value;
    else
        x = `${value.address} port ${value.port}`;
    console.log(`listening on ${x}`);
});
