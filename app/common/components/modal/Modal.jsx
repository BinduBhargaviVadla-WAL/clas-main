import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ModalComponent = props => {
  const { children, isOpen, toggle, className, title, footer } = props;

  return (
    <div>
      <Modal
        isOpen={isOpen}
        backdrop="static"
        toggle={toggle}
        centered
        className={classnames('modalProperties', className)}
      >
        {title && (
          <ModalHeader toggle={toggle} className="title">
            {title}
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </Modal>
    </div>
  );
};

ModalComponent.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  footer: PropTypes.node,
  toggle: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string
};

ModalComponent.defaultProps = {
  title: '',
  isOpen: false,
  footer: null,
  toggle: () => {},
  children: null,
  className: ''
};

export default ModalComponent;
