import store from './store';

let remote;
if (location.hostname == 'mfro.me')
    remote = 'wss://api.mfro.me/list/';
else
    remote = 'ws://localhost:8081/';

const ws = new WebSocket(remote);

store.subscribe((mut, state) => {
    if (mut.type == 'SET_STATE') return;

    ws.send(JSON.stringify({
        op: 'state',
        arg: state,
    }));
});

ws.addEventListener('message', (e) => {
    let data = JSON.parse(e.data);
    if (data.op == 'state') {
        store.commit('SET_STATE', data.arg);
    }
});
