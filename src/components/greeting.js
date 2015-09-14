import React from 'react';
import DocumentTitle from 'react-document-title';
import Content from './content';

export default class Greeting extends React.Component {
    render () {
        return (
            <DocumentTitle title="Welcome">
                <Content>
                    <h2>Howdy, { this.props.currentUser.username }!</h2>
                    <p>Thanks for logging in :)</p>
                </Content>
            </DocumentTitle>
        );
    }
}
