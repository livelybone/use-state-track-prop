import {
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export interface MapPropToState<T extends any, P extends any> {
  (props: P, preState?: T): T
}

export default function useStateTrackProp<P extends any>(
  props: P,
): [P, Dispatch<SetStateAction<P>>]
export default function useStateTrackProp<P extends any, T extends any>(
  props: P,
  mapPropToState: MapPropToState<T, P>,
): [T, Dispatch<SetStateAction<T>>]

/**
 * @param props                 组件的 prop 的集合
 *                              如果 props 为引用类型，为了提高性能，请使用 useMemo 来生成
 *
 *                              Assembly of the prop of the component
 *                              If props is a reference type, use `useMemo` hook to generate it for performance
 *
 * @param mapPropToState        映射函数
 *
 *                              map function
 *
 * @return [state, setState]
 * */
export default function useStateTrackProp<P extends any, T extends any = P>(
  props: P,
  mapPropToState?: MapPropToState<T, P>,
) {
  const initialized = useRef(false)
  const map = useRef<MapPropToState<T, P>>($props => $props as any)
  if (mapPropToState) map.current = mapPropToState

  const [state, set] = useState<T>(() => map.current!(props))

  useLayoutEffect(() => {
    if (initialized.current) set(pre => map.current!(props, pre))
    initialized.current = true
  }, [props])

  return useMemo(() => [state, set], [state, set])
}
