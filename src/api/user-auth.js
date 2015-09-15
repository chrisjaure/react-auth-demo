const hardCodedUsername = 'test';
const hardCodedPassword = 'test';

export default function(store) {
    return {
        authenticateUser: function({username, password}) {
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                    // simulate network request
                    if (username === hardCodedUsername && password === hardCodedPassword) {
                        resolve({username, token: 'randomtoken'});
                    }
                    else {
                        reject(new Error('Invalid username or password :('));
                    }
                }, 2000);
            });
        },

        isLoggedIn: function() {
            return !!this.getUser();
        },

        login: function(user) {
            return this.authenticateUser(user)
                .then((authenticatedUser) => {
                    store.user = JSON.stringify(authenticatedUser);
                    this.onChange(authenticatedUser);
                    return authenticatedUser;
                });
        },

        logout: function() {
            delete store.user;
            this.onChange();
        },

        requireAuthentication: function(nextState, redirectTo) {
            if (!this.isLoggedIn()) {
                redirectTo(null, '/login');
            }
        },

        getUser: function() {
            try {
                return JSON.parse(store.user);
            }
            catch (err) {
                delete store.user;
            }
        },

        onChange: function() {}
    };
}
