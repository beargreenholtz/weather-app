import { ReactNode } from 'react';
import * as ReactDOM from 'react-dom';
import classes from './Modal.module.scss';

interface IProps {
  readonly onClickCloseButton: React.MouseEventHandler<HTMLElement>;
  readonly children: ReactNode;
  readonly isShow: boolean;
}

const Modal: React.FC<IProps> = (props) => {
  const handlClickModal = (e) => {
    e.stopPropagation();
  };
  if (!props.isShow) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={classes['modalWrapper']} onClick={props.onClickCloseButton}>
      <div className={classes['modal']} onClick={handlClickModal}>
        <div className={classes['modal__body']}>{props.children}</div>
        <div className={classes['modal__footer']}>
          <button
            className={classes['modal__footer__button']}
            onClick={props.onClickCloseButton}
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
