import React, { ReactNode, MouseEventHandler } from 'react';
import * as ReactDOM from 'react-dom';

import classes from './Modal.module.scss';

interface TProps {
  onClickCloseButton: MouseEventHandler<HTMLElement>;
  children: ReactNode;
  isShow: boolean;
}

const Modal = (props: TProps) => {
  const handlClickModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  if (!props.isShow) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={classes['modalWrapper']} onClick={props.onClickCloseButton}>
      <div className={classes['modal']} onClick={handlClickModal}>
        <div className={classes['modal__body']}>{props.children}</div>
        <div className={classes['footer']}>
          <button
            className={classes['footer__button']}
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

const MemoizedModal = React.memo(Modal);

export default MemoizedModal;
