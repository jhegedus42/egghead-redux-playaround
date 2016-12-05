
// @flow
import React from 'react';
import {Link} from 'react-router';
import type { State$Filter } from '../types/state_types.js';

const FilterLink = ({filter,children}:{filter:State$Filter,children:React$Element<any>})=>(
  <Link
  to = {filter === 'all' ? '' :filter}
  activeStyle = {{
    textDecoration : 'none',
    color: 'black'
  }}
  >{children}</Link>
);

export default FilterLink;
