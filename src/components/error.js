import React from 'react'; // eslint-disable-line no-unused-vars

const styles = {
    color: '#812c11',
    padding: '1em',
    backgroundColor: '#ffefec',
    marginBottom: '1em'
};

export default ({children}) => (
    <div className="error" style={styles}>{children}</div>
);
