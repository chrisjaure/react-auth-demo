import React from 'react'; // eslint-disable-line no-unused-vars

const styles = (color = '#38e') => {
    return {
        MozAnimation: 'three-quarters-loader 1250ms infinite linear',
        WebkitAnimation: 'three-quarters-loader 1250ms infinite linear',
        animation: 'three-quarters-loader 1250ms infinite linear',
        border: '8px solid ' + color,
        borderRightColor: 'transparent',
        borderRadius: '50%',
        boxSizing: 'border-box',
        display: 'inline-block',
        position: 'relative',
        overflow: 'hidden',
        textIndent: -9999,
        width: 32,
        height: 32
    };
};

export default ({loading, color}) => {
    if (loading) {
        return <div className="loader" style={styles(color)} />
    }
    return <span />;
}
