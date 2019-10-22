# use-state-track-prop
[![NPM Version](http://img.shields.io/npm/v/use-state-track-prop.svg?style=flat-square)](https://www.npmjs.com/package/use-state-track-prop)
[![Download Month](http://img.shields.io/npm/dm/use-state-track-prop.svg?style=flat-square)](https://www.npmjs.com/package/use-state-track-prop)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

[中文文档](./README-CN.md)

A react hook for private state of component tracking some props

## repository
https://github.com/livelybone/use-state-track-prop.git

## Demo
https://github.com/livelybone/use-state-track-prop#readme

## Run Example
Your can see the usage by run the example of the module, here is the step:

1. Clone the library `git clone https://github.com/livelybone/use-state-track-prop.git`
2. Go to the directory `cd your-module-directory`
3. Install npm dependencies `npm i`(use taobao registry: `npm i --registry=http://registry.npm.taobao.org`)
4. Open service `npm run dev`
5. See the example(usually is `http://127.0.0.1/examples/test.html`) in your browser

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
 * @param props       Assembly of the prop of the component
 *                    If props is a reference type, use `useMemo` hook to generate it for performance
 *
 * @param reducer     Please make sure the reducer is a pure function
 *
 * @return [state, setState]
 * */
export default function useStateTrackProp<T extends any, P extends any>(props: P, reducer?: TReducer<T, P>): [T, Dispatch<SetStateAction<T>>];
```

## Usage
```typescript jsx
import React from 'react'
import useStateTrackProp from 'use-state-track-prop'

const Comp = ({ value }) => {
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

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/use-state-track-prop/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/use-state-track-prop/lib/umd/<--module-->.js"></script>
```
