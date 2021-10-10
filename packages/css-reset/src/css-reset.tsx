import * as React from "react"
import { Global } from "@emotion/react"
import { resetStyles } from "./styles"

export interface CSSResetProps {
  /**
   * Applies the reset styles to a given selector.
   * @example ".content"
   */
  selector?: string
}

export const CSSReset = ({ selector }: CSSResetProps) => {
  const styles = React.useMemo(() => {
    if (!selector) {
      return resetStyles
    }
    return { [selector]: resetStyles }
  }, [selector])

  return <Global styles={styles} />
}

export default CSSReset
