// lib
import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

// components

// styles
const styles = require('./PreviewPc.module.less')

interface PreviewProps {
  visible: boolean
  title?: string
  list: Array<string>
  curIndex?: number
  onCancel: () => void
}

export default function PreviewPc({
  visible,
  title,
  list,
  curIndex,
  onCancel,
}: PreviewProps) {
  const [activeIndex, setActiveIndex] = React.useState<number>(0)
  const root = React.useRef<any>()

  if (!root.current) {
    root.current = document.createElement('div')
    document.body.appendChild(root.current)
  }

  React.useEffect(() => {
    if (visible) {
      setActiveIndex(curIndex || 0)
    }
  }, [visible, curIndex])

  const handleImg = (i: number) => () => {
    setActiveIndex(i)
  }

  if (!visible) {
    return null
  }

  const renderModal = () => {
    return (
      <React.Fragment>
        <div className={styles.mask} onClick={onCancel} />
        <div className={styles.modal}>
          {title ? <div className={styles['modal-header']}>{title}</div> : null}
          <div className={styles['modal-close']} onClick={onCancel} />
          <div className={styles['modal-body']}>
            <div className={styles.preview}>
              <img src={list[activeIndex]} alt="" />
            </div>
            <div className={styles['img-list']}>
              {list.map((url, i) => (
                <div
                  key={i}
                  className={classnames(styles.img, {
                    [styles.active]: activeIndex === i,
                  })}
                  onClick={handleImg(i)}
                >
                  <img src={url} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  return ReactDOM.createPortal(renderModal(), root.current)
}
