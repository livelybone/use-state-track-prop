import { Dispatch, SetStateAction } from 'react'

interface MapPropToState<T extends any, P extends any> {
  (props: P, preState?: T, preProps?: P): T
}

declare function useStateTrackProp<P extends any>(
  props: P,
): [P, Dispatch<SetStateAction<P>>]
declare function useStateTrackProp<P extends any, T extends any>(
  props: P,
  mapPropToState: MapPropToState<T, P>,
): [T, Dispatch<SetStateAction<T>>]

export default useStateTrackProp
export { MapPropToState }
