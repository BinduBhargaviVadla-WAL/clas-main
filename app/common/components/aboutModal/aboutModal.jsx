import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ClLogo from '../../../assets/images/cl-logo.png';

const AboutModal = ({ onClose, version }) => {
  return (
    <Modal
      isOpen
      toggle={onClose}
      className="alertMessage-wrapper about-modal-wrapper"
      backdrop="static"
    >
      <ModalHeader>
        <i className="modal-close fas fa-times" onClick={onClose} />
        <span className="theme-primary">About</span>
      </ModalHeader>
      <ModalBody>
        <img src={ClLogo} alt="Cypress Lawn" className="logo" />
        <p className="version">Version {version}</p>
      </ModalBody>
      <ModalFooter />
    </Modal>
  );
};

AboutModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  version: PropTypes.string.isRequired
};

export default AboutModal;
