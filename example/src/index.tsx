// lib
import React from 'react'
import ReactDOM from 'react-dom'

// components
import { PreviewPc } from '../../src'

// styles
const styles = require('./App.module.less')

const root = document.createElement('div')

window.document.body.appendChild(root)

const IMAGE_LIST = [
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588839628341&di=b98adc6fbcc93e90ad0fa92c83e1eece&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588839628340&di=e9b1910b19106be5c0ae84bf222a207a&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd62a6059252dd42a1c362a29033b5bb5c9eab870.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588839669099&di=4d00ef862c9d52ac84857b79d4cdbeca&imgtype=0&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D3984473917%2C238095211%26fm%3D214%26gp%3D0.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588839628340&di=ec1d45b0bac0d917f7e68469d121bdeb&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F16%2F18%2F300000932954129238184537620_950.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588839628339&di=4251614a740b84ce957e315182ccfa55&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F20%2F62%2F01000000000000119086280352820.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588839628338&di=5ee854a408d4e1b1313ad96719a8b05b&imgtype=0&src=http%3A%2F%2Fb2-q.mafengwo.net%2Fs5%2FM00%2F91%2F06%2FwKgB3FH_RVuATULaAAH7UzpKp6043.jpeg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588839628337&di=9a3435e554db84bea81fe8401c33f1c8&imgtype=0&src=http%3A%2F%2Fgbres.dfcfw.com%2FFiles%2Fpicture%2F20200507%2F43589F2144D266AC078EEE69A104B7E2_w750h1334.jpg',
]

export default function App() {
  const [showModal, setShowModal] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState<number>(0)

  const handleOpenPreviewModal = (i: number) => () => {
    setShowModal(true)
    setActiveIndex(i)
  }

  return (
    <div>
      <div className={styles['img-list']}>
        {IMAGE_LIST.map((url, i) => (
          <div
            key={i}
            className={styles.img}
            onClick={handleOpenPreviewModal(i)}
          >
            <img src={url} alt="" />
          </div>
        ))}
      </div>
      <PreviewPc
        visible={showModal}
        title="预览图片"
        list={IMAGE_LIST}
        curIndex={activeIndex}
        onCancel={() => setShowModal(false)}
      />
    </div>
  )
}

ReactDOM.render(<App />, root)
