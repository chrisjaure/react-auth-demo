import React, {PropTypes} from 'react';
import DocumentTitle from 'react-document-title';
import Content from './content';
import ErrorText from './error';
import FormLabel from './form-label';
import FormRow from './form-row';
import LoadingButton from './loading-button';

export default class Login extends React.Component {
    static propTypes = {
        login: PropTypes.func
    }
    constructor (...args) {
        super(...args);
        this.state = {
            userInput: {
                username: '',
                password: ''
            },
            error: null,
            loading: false
        };
    }
    handleSubmit (event) {
        event.preventDefault();
        this.setState({ loading: true });
        return this.props.login(this.state.userInput).then(null, (err) => {
            this.setState({
                error: err.message,
                loading: false
            });
        });
    }
    handleInput (type) {
        return (event) => {
            let userInput = this.state.userInput;
            userInput[type] = event.target.value;
            this.setState({userInput});
        };
    }
    render () {
        return (
            <DocumentTitle title="Login">
                <Content>
                    <h2>Login</h2>
                    {this.state.error ?
                        <ErrorText>{this.state.error}</ErrorText> : null}
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <FormRow>
                            <FormLabel>Username:</FormLabel>
                            <input type="text" onChange={this.handleInput('username')} value={this.state.userInput.username} />
                        </FormRow>
                        <FormRow>
                            <FormLabel>Password:</FormLabel>
                            <input type="password" onChange={this.handleInput('password')} value={this.state.userInput.password} />
                        </FormRow>
                        <LoadingButton loading={this.state.loading}>
                            Login
                        </LoadingButton>
                    </form>
                </Content>
            </DocumentTitle>
        );
    }
}
