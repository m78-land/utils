# utils

## introduce
常用工具函数

<br>

## Installation
使用npm
```
npm install @lxjx/utils

```
使用yarn
```
yarn add @lxjx/utils
```

<br>

## Usage
```js
import { isEmpty } from '@lxjx/utils';

isEmpty({})   // => true
isEmpty([])   // => true

// or
import * as utils from '@lxjx/utils';

utils.isEmpty({})   // => true
utils.isEmpty([])   // => true
```
