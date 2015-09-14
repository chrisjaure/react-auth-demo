import React, {PropTypes} from 'react';
import Loader from './loader';
import xtend from 'xtend';

const buttonStyle = {
    transition: 'all 0.2s',
    backgroundColor: '#F37C62',
    position: 'relative',
    color: '#fff'
};

const buttonLoadingStyle = {
    paddingRight: '4em'
};

const buttonHoverStyles = {
    backgroundColor: '#d94c2e'
};

const loaderStyle = {
    transition: 'opacity 0.2s',
    opacity: 0,
    position: 'absolute',
    right: '1em',
    top: '50%',
    transform: 'translateY(-50%)'
};

const loaderLoadingStyle = {
    opacity: 1
};

export default class LoadingButton extends React.Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired
    }
    constructor (...args) {
        super(...args);
        this.state = {
            hover: false
        };
    }
    handleMouseEnter () {
        if (!this.props.loading) {
            this.setState({ hover: true });
        }
    }
    handleMouseLeave () {
        this.setState({ hover: false });
    }
    render () {
        const {loading, children} = this.props;
        return (
            <button
                onClick={this.handleMouseLeave.bind(this)}
                onMouseEnter={this.handleMouseEnter.bind(this)}
                onMouseLeave={this.handleMouseLeave.bind(this)}
                style={xtend(
                    buttonStyle,
                    loading ? buttonLoadingStyle : {},
                    this.state.hover ? buttonHoverStyles : {})}
                disabled={loading}>
                {children}
                <div style={loading ? xtend(loaderStyle, loaderLoadingStyle) : loaderStyle}>
                    <Loader loading={loading} color="#ffd59d" />
                </div>
            </button>
        );
    }
}
