import React from 'react';

const styles = {
    color: '#812c11',
    padding: '1em',
    backgroundColor: '#ffefec',
    marginBottom: '1em'
};

export default ({children}) => (
    <div className="error" ref="error" style={styles}>{children}</div>
)
