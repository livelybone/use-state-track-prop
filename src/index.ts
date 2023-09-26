import {
  Dispatch,
  SetStateAction,
  useCallback,
  useReducer,
  useRef,
  useState,
} from 'react'

export interface MapPropToState<T extends any, P extends any> {
  (
    props: P,
    preState?: T extends undefined ? Exclude<T, undefined> : T,
    preProps?: P extends undefined ? Exclude<P, undefined> : P,
  ): T
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
  const preProps = useRef<P>()
  const map = useRef<MapPropToState<T, P>>()

  map.current = mapPropToState || ((($prop: P) => $prop) as any)

  const [, forceUpdate] = useReducer(pre => pre + 1, 0)
  const initState = useState(() => map.current!(props))[0]
  const state = useRef<T>(initState)

  if (props !== preProps.current) {
    // Update
    state.current = map.current!(
      props,
      state.current as any,
      preProps.current as any,
    )
    preProps.current = props
  }

  return [
    state.current, // setState method
    useCallback(
      (action: SetStateAction<T>) => {
        state.current =
          typeof action === 'function' ? (action as any)(state.current) : action
        forceUpdate()
      },
      [forceUpdate],
    ),
  ]
}
