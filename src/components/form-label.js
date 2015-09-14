import React from 'react';

const styles = {
    display: 'inline-block',
    width: '6em'
};

export default ({children}) => (
    <label style={styles}>{children}</label>
)
