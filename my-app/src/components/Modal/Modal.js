import modalStyles from "./Modal.module.css";

function Modal(props) {
  if (!props.isOpened) return null;

  return (
    <div className={modalStyles.overlay} onClick={props.onClose}>
      <div className={modalStyles.container}>
        <div className={modalStyles.header}>
          <h4>{props.title}</h4>
          <button onClick={props.onClose}>
            <img src="/cross_circle.svg" alt="" width={30} />
          </button>
        </div>
        <div className={modalStyles.content}>{props.children}</div>
      </div>
    </div>
  );
}

export default Modal;
