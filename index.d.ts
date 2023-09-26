import { Dispatch, SetStateAction } from 'react'

interface MapPropToState<T extends any, P extends any> {
  (
    props: P,
    preState?: T extends undefined ? Exclude<T, undefined> : T,
    preProps?: P extends undefined ? Exclude<P, undefined> : P,
  ): T
}

/**
 * @param props                 组件的 prop 的集合
 *                              如果 props 为引用类型，请使用 useMemo 来生成，否则这个 hook 可能会让你的程序奔溃
 *
 *                              Assembly of the prop of the component
 *                              If props is a complex variable, use `useMemo` hook to generate it, or the hook may bring you a crash
 *
 * @return [state, setState]
 * */
declare function useStateTrackProp<P extends any>(
  props: P,
): [P, Dispatch<SetStateAction<P>>]
/**
 * @param props                 组件的 prop 的集合
 *                              如果 props 为引用类型，请使用 useMemo 来生成，否则这个 hook 可能会让你的程序奔溃
 *
 *                              Assembly of the prop of the component
 *                              If props is a complex variable, use `useMemo` hook to generate it, or the hook may bring you a crash
 *
 * @param mapPropToState        映射函数
 *
 *                              map function
 *
 * @return [state, setState]
 * */
declare function useStateTrackProp<P extends any, T extends any>(
  props: P,
  mapPropToState: MapPropToState<T, P>,
): [T, Dispatch<SetStateAction<T>>]

export default useStateTrackProp
export { MapPropToState }
