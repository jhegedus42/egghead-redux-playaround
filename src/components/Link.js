
// @flow
import React from 'react';
import {connect} from 'react-redux';
import {setVisibilityFilter} from '../action_creators.js'
//Link presentation component - does not know about the behaviour
const Link = props => {
  if (props.active) {
    return React.createElement(
      'span',
      null, //no
      props.children
    );
  }
  return React.createElement(
    'a',
    { href: '#', onClick: e => {
        e.preventDefault();props.onClick();
      } },
    props.children
  );
};

// FilterLink container Component

const mapStateToLinkProps = ( state,ownProps ) =>(
   { active: ownProps.filter=== state.visibilityFilter });
const mapDispatchToLinkProps =(dispatch,ownProps)=>
  ({ onClick() { dispatch ( setVisibilityFilter(ownProps.filter) ) }} )

export const FilterLink = connect (
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);
