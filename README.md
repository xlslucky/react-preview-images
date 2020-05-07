# react-preview-images

> This project is still in the test phase, use it carefully! 😈

## Install

```shell
$ npm install react-preview-images
```

## Usage

```jsx
import { PreviewPc, PreviewH5 } from 'react-preview-images'
import 'react-preview-images/dist/main.css'
```

## Demo

#### PreviewPc

```jsx
import { PreviewPc } from 'react-preview-images'
import 'react-preview-images/dist/main.css'

...
const [visible, setVisible] = React.useState(false)
...

...
<PreviewPc
  visible={visible}
  title="预览图片"
  list={['1.jpg', '2.jpg', '3.jpg', '4.jpg']}
  onCancel={() => setVisible(false)}
/>
...
```

#### PreviewH5

```jsx
import { PreviewH5 } from 'react-preview-images'
import 'react-preview-images/dist/main.css'

...
const [visible, setVisible] = React.useState(false)
...

...
<PreviewH5
  visible={visible}
  list={['1.jpg', '2.jpg', '3.jpg', '4.jpg']}
  onCancel={() => setVisible(false)}
/>
...
```