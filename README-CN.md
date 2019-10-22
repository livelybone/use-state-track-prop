# use-state-track-prop
[![NPM Version](http://img.shields.io/npm/v/use-state-track-prop.svg?style=flat-square)](https://www.npmjs.com/package/use-state-track-prop)
[![Download Month](http://img.shields.io/npm/dm/use-state-track-prop.svg?style=flat-square)](https://www.npmjs.com/package/use-state-track-prop)
![gzip with dependencies: 1kb](https://img.shields.io/badge/gzip--with--dependencies-1kb-brightgreen.svg "gzip with dependencies: 1kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, 天然支持 tree-shaking, 使用 es module 引用即可

[English Document](./README.md)

A react hook for private state of component tracking some props

## repository
https://github.com/livelybone/use-state-track-prop.git

## Demo
https://github.com/livelybone/use-state-track-prop#readme

## Run Example
你可以通过运行项目的 example 来了解这个组件的使用，以下是启动步骤：

1. 克隆项目到本地 `git clone https://github.com/livelybone/form.git`
2. 进入本地克隆目录 `cd your-module-directory`
3. 安装项目依赖 `npm i`(使用 taobao 源: `npm i --registry=http://registry.npm.taobao.org`)
4. 启动服务 `npm run dev`
5. 在你的浏览器看 example (地址通常是 `http://127.0.0.1:3000/examples/test.html`)

## Installation
```bash
npm i -S use-state-track-prop
```

## Global name - The variable the module exported in `umd` bundle
`useStateTrackProp`

## Interface
```typescript
import { Dispatch, SetStateAction } from 'react'

export interface TReducer<T, P> {
  (props: P, preState?: T): T;
}

/**
 * @param props       组件的 prop 的集合
 *                    如果 props 为引用类型，为了提高性能，请使用 useMemo 来生成
 *
 * @param reducer     请确保 reducer 为纯函数
 *
 * @return [state, setState]
 * */
export default function useStateTrackProp<T extends any, P extends any>(props: P, reducer?: TReducer<T, P>): [T, Dispatch<SetStateAction<T>>];
```

## Usage
```typescript jsx
import React, { FC } from 'react'
import useStateTrackProp from 'use-state-track-prop'

const Comp: FC<{value: boolean}> = ({ value }) => {
  const [$value, setValue] = useStateTrackProp(
    value,
    (value, preValue) => preValue || value,
  )
  
  return (
    <div>
      {$value}
      <button onClick={() => setValue(pre => !pre)}>Toggle Value</button>
    </div>
  )
}
```

在 HTML 文件中直接引用，你可以在 [CDN: unpkg](https://unpkg.com/@livelybone/form/lib/umd/) 看到你能用到的所有 js 脚本
```html
<-- 然后使用你需要的 -->
<script src="https://unpkg.com/@livelybone/form/lib/umd/<--module-->.js"></script>
```
