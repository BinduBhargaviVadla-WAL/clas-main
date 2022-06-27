import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';

const Tags = ({ tags, onRemoveClick }) => {
  return (
    <div>
      {tags.map((item, index) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <p style={{ fontSize: '14px', fontWeight: '500' }}>
            {item}
            <AiOutlineClose
              color="#EB5757"
              className="removeIcon"
              onClick={() => {
                onRemoveClick(index);
              }}
            />
          </p>
        </div>
      ))}
    </div>
  );
};

Tags.propTypes = {
  tags: PropTypes.shape([]).isRequired,
  onRemoveClick: PropTypes.func.isRequired
};

Tags.defaultProps = {};

export default Tags;
