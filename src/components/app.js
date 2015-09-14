import React from 'react';

const styles = {
    maxWidth: '40em',
    margin: '0 auto'
};

const bannerStyles = {
    backgroundColor: '#333333',
    color: '#fff',
    padding: '1em'
};

const logoutStyles = {
    color: '#8CFFF5'
};

class App extends React.Component {
    constructor (...args) {
        super(...args);
        App.userAuth.onChange = (user) => {
            this.setState({
                currentUser: user
            });
        };
        this.state = {
            currentUser: App.userAuth.getUser()
        };
    }
    login (user) {
        return App.userAuth.login(user).then(() => {
            this.props.history.replaceState(null, '/');
        });
    }
    handleLogout (event) {
        event.preventDefault();
        App.userAuth.logout();
        this.props.history.pushState(null, '/login');
    }
    renderChildren () {
        return React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
                login: this.login.bind(this),
                currentUser: this.state.currentUser
            });
        });
    }
    render () {
        return (
            <div style={styles}>
                <header style={bannerStyles}>
                    <h1>React Auth Demo</h1>
                </header>
                {this.renderChildren()}
                <footer style={bannerStyles}>
                    {this.state.currentUser ?
                        <a href="" className="logout" style={logoutStyles} onClick={this.handleLogout.bind(this)}>Logout</a> : null}
                </footer>
            </div>
        );
    }
}

export default App;
export function appBootstrap(userAuth) {
    App.userAuth = userAuth;
    return App;
}
