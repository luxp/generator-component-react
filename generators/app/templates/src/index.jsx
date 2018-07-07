import React from 'react';
import PropTypes from 'prop-types';

class <%= camelComponentName %> extends React.Component {
  render() {
    const { content } = this.props;
    return <div>{content}</div>;
  }
}

<%= camelComponentName %>.propTypes = {
  content: PropTypes.string,
};

export default <%= camelComponentName %>;
