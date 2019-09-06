import store from '.';

const fields = ['shopping'];

const storageKey = 'shopping-list.state';

let value = localStorage.getItem(storageKey);
if (value != null) {
    store.commit('ASSIGN', JSON.parse(value));
}

store.subscribe((mut, state) => {
    let arg = {};
    for (let key of fields) {
        if (key in state) {
            arg[key] = state[key];
        }
    }

    localStorage.setItem(storageKey, JSON.stringify(arg));
});
