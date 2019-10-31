import store from '.';

const fields = ['items', 'memory'];

let remote;
if (location.hostname == 'mfro.me')
    remote = 'wss://api.mfro.me/list/';
else
    remote = 'ws://localhost:8081/';

const ws = new WebSocket(remote);

ws.addEventListener('open', () => {
    store.subscribe((mut, state) => {
        if (mut.type == 'ASSIGN') return;

        let arg = {};
        for (let key of fields) {
            if (key in state) {
                arg[key] = state[key];
            }
        }

        ws.send(JSON.stringify({
            op: 'state',
            arg: arg,
        }));
    });
});

ws.addEventListener('message', (e) => {
    let data = JSON.parse(e.data);
    if (data.op == 'state') {
        let arg = {};
        for (let key of fields) {
            if (key in data.arg) {
                arg[key] = data.arg[key];
            }
        }

        store.commit('ASSIGN', arg);
    }
});
