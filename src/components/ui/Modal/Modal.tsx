import * as ReactDOM from 'react-dom';
import classes from './Modal.module.scss';

const Modal = (props) => {
  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  if (!props.show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={classes['modalWrapper']} onClick={props.onCloseButtonClick}>
      <div className={classes['modal']} onClick={handleModalClick}>
        <div className={classes['modal__body']}>{props.children}</div>
        <div className={classes['modal__footer']}>
          <button
            className={classes['modal__footer__button']}
            onClick={props.onCloseButtonClick}
          >
            Close Modal
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
