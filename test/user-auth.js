import test from 'tape';
import UserAuth from '../src/api/user-auth';

const validCredentials = {
    username: 'test',
    password: 'test'
};

test('authenticate correct credentials', (t) => {
    let storeMock = {};
    const userAuth = UserAuth(storeMock);
    t.plan(1);
    userAuth.authenticateUser(validCredentials).then(() => {
        t.pass('authenticated!');
    });
});

test('not authenticate bad credentials', (t) => {
    let storeMock = {};
    const userAuth = UserAuth(storeMock);
    t.plan(1);
    userAuth.authenticateUser({
        username: '',
        password: ''
    }).then(null, () => {
        t.pass('not authenticated!');
    });
});

test('save user in store when logged in', (t) => {
    let storeMock = {};
    const userAuth = UserAuth(storeMock);
    t.plan(2);
    userAuth.authenticateUser = () => Promise.resolve();
    userAuth.login(validCredentials).then((user) => {
        t.equal(validCredentials, user, 'resolved user is correct');
        t.equal(storeMock.user, JSON.stringify(validCredentials), 'stored user is correct');
    });
});

test('fire change event', (t) => {
    let storeMock = {};
    const userAuth = UserAuth(storeMock);
    t.plan(1);
    userAuth.authenticateUser = () => Promise.resolve();
    userAuth.onChange = () => {
        t.pass('event fired');
    };
    userAuth.login(validCredentials);
});

test('clear store when logged out', (t) => {
    let storeMock = {};
    const userAuth = UserAuth(storeMock);
    t.plan(2);
    userAuth.authenticateUser = () => Promise.resolve();
    userAuth.login(validCredentials).then(() => {
        userAuth.onChange = () => {
            t.pass('event fired');
        };
        userAuth.logout();
        t.notOk(storeMock.user, 'empty store');
    });
});

test('fetch user', (t) => {
    let storeMock = {};
    const userAuth = UserAuth(storeMock);
    t.plan(2);
    t.notOk(userAuth.getUser(), 'empty user');
    userAuth.authenticateUser = () => Promise.resolve();
    userAuth.login(validCredentials).then(() => {
        t.deepEqual(userAuth.getUser(), validCredentials, 'correct user');
    });
});

test('redirect to login for routes', (t) => {
    let storeMock = {};
    const userAuth = UserAuth(storeMock);
    t.plan(1);
    userAuth.requireAuthentication(null, (path, query) => {
        t.equal(query, '/login', 'correct path');
    });
});
