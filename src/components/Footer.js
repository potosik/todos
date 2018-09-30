import React from 'react';
import FilterLink from './FilterLink';

// presentational component to display filter links
const Footer = () => {
    return (
        <p>
            Show
            {' '}
            <FilterLink
                filter='all'>
                All
            </FilterLink>
            {' '}
            <FilterLink
                filter='active'>
                Active
            </FilterLink>
            {' '}
            <FilterLink
                filter='completed'>
                Completed
            </FilterLink>
        </p>
    );
};

export default Footer;