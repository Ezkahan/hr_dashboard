import React, { useState, useEffect } from "react";
import { gsap } from "gsap";

const Modal = (props) => {
  let modalVeil = null;
  let modalDialog = null;
  let modalContent = null;

  const [modalTween] = useState(gsap.timeline({ paused: true }));

  useEffect(() => {
    modalTween
      .to(modalVeil, 0.25, { autoAlpha: 1 })
      .to(modalDialog, 0.35, { y: 0, autoAlpha: 1 })
      .from(
        modalContent.children,
        0.35,
        { y: 15, opacity: 0, stagger: 0.1 },
        "-=0.15"
      )
      .reverse();
  }, []);

  useEffect(() => {
    modalTween.reversed(!props.visible);
  }, [props.visible]);

  const closeModal = () => {
    modalTween.reverse();
    gsap.delayedCall(modalTween.duration(), props.close);
  };

  return (
    <div className={`modal-container${props.visible ? " show" : ""}`}>
      <div
        className="modal-veil"
        ref={(e) => (modalVeil = e)}
        onClick={closeModal}
      />
      <div className="modal-dialog" ref={(e) => (modalDialog = e)}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro voluptas
        id tempore ducimus non beatae quisquam reprehenderit commodi corporis,
        error eveniet dolor veniam eligendi ab repellendus, numquam aperiam
        inventore tempora?
      </div>
    </div>
  );
};

export default Modal;

// example
{
  /* <Modal visible={false|true} close={close()}/> */
}
