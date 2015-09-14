import React from 'react'; // eslint-disable-line no-unused-vars

const styles = {
    display: 'inline-block',
    width: '6em'
};

export default ({children}) => (
    <label style={styles}>{children}</label>
);
