import {
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export interface TReducer<T, P> {
  (props: P, preState?: T): T
}

/**
 * @param props       组件的 prop 的集合
 *                    如果 props 为引用类型，为了提高性能，请使用 useMemo 来生成
 *
 *                    Assembly of the prop of the component
 *                    If props is a reference type, use `useMemo` hook to generate it for performance
 *
 * @param reducer     请确保 reducer 为纯函数
 *
 *                    Please make sure the reducer is a pure function
 *
 * @return [state, setState]
 * */
export default function useStateTrackProp<T extends any, P extends any>(
  props: P,
  reducer?: TReducer<T, P>,
): [T, Dispatch<SetStateAction<T>>] {
  const $reducer = useRef<TReducer<T, P>>($props => ($props as any) as T)
  const [state, set] = useState<T>($reducer.current!(props))

  useLayoutEffect(() => {
    if (reducer) $reducer.current = reducer
  }, [reducer])

  useLayoutEffect(() => {
    set(pre => $reducer.current!(props, pre))
  }, [props])

  return useMemo(() => [state, set], [state, set])
}
