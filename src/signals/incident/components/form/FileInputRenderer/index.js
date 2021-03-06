import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';

import FileInput from '../FileInput';

const FileInputRenderer = ({ handler, touched, hasError, getError, parent, meta, validatorsOrOpts }) => {
  if (!meta?.isVisible) return null;

  return (
    <Header meta={meta} options={validatorsOrOpts} touched={touched} hasError={hasError} getError={getError}>
      <FileInput handler={handler} parent={parent} meta={meta} />
    </Header>
  );
};

FileInputRenderer.propTypes = {
  handler: PropTypes.func,
  touched: PropTypes.bool,
  hasError: PropTypes.func,
  meta: PropTypes.object,
  parent: PropTypes.object,
  getError: PropTypes.func.isRequired,
  validatorsOrOpts: PropTypes.object,
};

export default FileInputRenderer;
