import React from "react";
import { Modal as BootstrapModal } from "react-bootstrap";

function Modal({ children, title, show, setShow }) {
  const handleClose = () => {
    setShow(false);
  };

  return (
    <BootstrapModal show={show} onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{children}</BootstrapModal.Body>
    </BootstrapModal>
  );
}

export default Modal;
