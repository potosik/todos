import React from 'react';
import PropTypes from 'prop-types';

// filter link component
const Link = ({
                  active,
                  children,
                  onClick
              }) => {
    // check if it is a current filter
    if (active) {
        return <span>{children}</span>;
    }

    return (
        <a href='#'
           onClick={e => {
               // preventing link behavior
               e.preventDefault();
               onClick();
           }}>
            {children}
        </a>
    )
};

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Link;