// lib
import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { useResize } from 'use-hooks-react'

// components
// import Icon from '../Icon'

// styles
const styles = require('./PreviewH5.module.less')

interface PreviewItemProps {
  url: string
  show: boolean
}

function PreviewItem({ url: initUrl, show }: PreviewItemProps) {
  const imgRef = React.useRef<any>()
  const [center, setCenter] = React.useState(true)
  const [attribute] = useResize()
  const [loading, setLoading] = React.useState(false)
  const [url, setUrl] = React.useState<string>()

  const { screenHeight } = attribute

  React.useEffect(() => {
    if (show && !url && initUrl) {
      setUrl(initUrl)
      setLoading(true)
    }
  }, [initUrl, show, url])

  function onLoad() {
    setLoading(false)
    setTimeout(() => {
      const { offsetHeight } = imgRef.current
      if (offsetHeight > screenHeight) {
        setCenter(false)
      }
    })
  }

  return (
    <div
      className={classnames(styles['preview-item'], {
        [styles.center]: center,
      })}
    >
      {loading ? <div className={styles['loading-box']} /> : null}
      <img
        style={{ display: loading ? 'none' : 'block' }}
        onLoad={onLoad}
        ref={imgRef}
        src={url}
        alt=""
      />
    </div>
  )
}

interface PreviewH5Props {
  curIndex?: number
  list: Array<string>
  visible: boolean
  onCancel: () => void
}

export default function PreviewH5({
  curIndex,
  list,
  visible,
  onCancel,
}: PreviewH5Props) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [startX, setStartX] = React.useState(0)
  const [translate, setTranslate] = React.useState(0)
  const [animation, setAnimation] = React.useState(false)
  const [attribute] = useResize()
  const { screenWidth } = attribute

  const root = React.useRef<any>()

  if (!root.current) {
    root.current = document.createElement('div')
    document.body.appendChild(root.current)
  }

  React.useEffect(() => {
    if (visible) {
      setCurrentIndex(curIndex || 0)
      setAnimation(false)
    }
  }, [curIndex, visible])

  function onTouchStart(evt: React.TouchEvent) {
    const touch = evt.touches[0]
    const x = Number(touch.pageX)
    setStartX(x)
    setAnimation(false)
  }

  function onTouchMove(evt: React.TouchEvent) {
    const touch = evt.touches[0]
    const x = Number(touch.pageX)
    const number = x - startX

    // 滑动小于30px不做操作
    if (Math.abs(number) < 30) {
      return
    }
    if (currentIndex === 0 && number > 0) {
      // 第一张左划
      setTranslate(number / 2)
    } else if (currentIndex === list.length - 1 && number < 0) {
      // 最后一张右滑
      setTranslate(number / 2)
    } else {
      setTranslate(number)
    }
  }

  function onTouchEnd() {
    const offset = screenWidth * 0.25
    if (translate < -offset && currentIndex < list.length - 1) {
      // 下一张
      setCurrentIndex(currentIndex + 1)
    }
    if (translate > offset && currentIndex > 0) {
      // 上一张
      setCurrentIndex(currentIndex - 1)
    }
    setStartX(0)
    setTranslate(0)
    setAnimation(true)
  }

  const listStyle = React.useMemo(() => {
    const number = -(currentIndex * (screenWidth + 10)) + translate
    return {
      transform: `translateX(${number}px)`,
    }
  }, [screenWidth, currentIndex, translate])

  if (!visible) {
    return null
  }

  const renderModal = () => {
    return (
      <div className={styles.preview}>
        <div className={styles.close} onClick={onCancel} />
        <div
          className={classnames(styles['preview-list'], {
            [styles.animation]: animation,
          })}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={listStyle}
        >
          {list.map((url, i) => {
            // show 只加载当前、前、后 三张图
            return (
              <PreviewItem
                key={`${i + 1}`}
                url={url}
                show={Math.abs(currentIndex - i) <= 1}
              />
            )
          })}
        </div>
        <div className={styles.footer}>
          {list.map((_, i) => (
            <span
              className={classnames(styles.round, {
                [styles.active]: currentIndex === i,
              })}
              key={`${i + 1}`}
            />
          ))}
        </div>
      </div>
    )
  }

  if (!visible) {
    return null
  }

  return ReactDOM.createPortal(renderModal(), root.current)
}
