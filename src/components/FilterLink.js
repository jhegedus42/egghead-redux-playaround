
// @flow
import React from 'react';
import {Link} from 'react-router';
import type {State_Filter} from '../reducers/idsByFilterMap_Reducer.js'

const FilterLink = ({filter,children}:{filter:State_Filter,children:React$Element<any>})=>(
  <Link
  to = {filter === 'all' ? '' :filter}
  activeStyle = {{
    textDecoration : 'none',
    color: 'black'
  }}
  >{children}</Link>
);

export default FilterLink;
