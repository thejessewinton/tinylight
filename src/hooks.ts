import { useEffect, useLayoutEffect, useState } from 'react'

export const useIsomorphicEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export const useDelayUnmount = (isMounted: boolean, delayTime: number) => {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    let timeoutId: number
    if (isMounted && !shouldRender) {
      setShouldRender(true)
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(
        () => setShouldRender(false),
        delayTime,
      ) as unknown as number
    }
    return () => clearTimeout(timeoutId)
  }, [isMounted, delayTime, shouldRender])
  return shouldRender
}
