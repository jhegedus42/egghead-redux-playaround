// @flow
//Footer component
import React from 'react';
import {FilterLink} from './Link.js'

export const Footer  = () : React$Element<any> => {
  return React.createElement(
    'p',
    null,
    'Show:',
    ' ',
    React.createElement(FilterLink, {filter: 'SHOW_ALL', children: React.createElement( 'span', {}, 'All' ) }),
    ' ',
    React.createElement(FilterLink, {filter: 'SHOW_ACTIVE', children: React.createElement('span',{},'Active')}),
    ' ',
    React.createElement(FilterLink, {filter: 'SHOW_COMPLETED', children: React.createElement( 'span', {}, 'Completed' )})
  );
};
