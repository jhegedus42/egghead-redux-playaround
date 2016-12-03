// @flow
//Footer component
import React from 'react';
import  FilterLink from './FilterLink.js'

export const Footer  = () : React$Element<any> => {
  return React.createElement(
    'p',
    null,
    'Show:',
    ' ',
    React.createElement(FilterLink, {filter: 'all', children: React.createElement( 'span', {}, 'All' ) }),
    ' ',
    React.createElement(FilterLink, {filter: 'active', children: React.createElement('span',{},'Active')}),
    ' ',
    React.createElement(FilterLink, {filter: 'completed', children: React.createElement( 'span', {}, 'Completed' )})
  );
};
