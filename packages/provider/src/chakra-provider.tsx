import CSSReset, { CSSResetProps } from "@chakra-ui/css-reset"
import { PortalManager } from "@chakra-ui/portal"
import {
  ColorModeProvider,
  ColorModeProviderProps,
  GlobalStyle,
  ThemeProvider,
  ThemeProviderProps,
} from "@chakra-ui/system"
import { Dict } from "@chakra-ui/utils"
import {
  EnvironmentProvider,
  EnvironmentProviderProps,
} from "@chakra-ui/react-env"
import * as React from "react"
import { IdProvider } from "@chakra-ui/hooks"

export interface ChakraProviderProps
  extends Pick<ThemeProviderProps, "cssVarsRoot"> {
  /**
   * a theme. if omitted, uses the default theme provided by chakra
   */
  theme?: Dict
  /**
   * Common z-index to use for `Portal`
   *
   * @default undefined
   */
  portalZIndex?: number
  /**
   * If truthy, `CSSReset` component will be mounted to help
   * you reset browser styles
   *
   * @example
   * ".content" => scopes the reset to given selector
   * true => applies the reset on a global level
   *
   * @default true
   */
  resetCSS?: boolean | CSSResetProps["selector"]
  /**
   * manager to persist a users color mode preference in
   *
   * omit if you don't render server-side
   * for SSR: choose `cookieStorageManager`
   *
   * @default localStorageManager
   */
  colorModeManager?: ColorModeProviderProps["colorModeManager"]
  /**
   * Your application content
   */
  children?: React.ReactNode
  /**
   * The environment (`window` and `document`) to be used by
   * all components and hooks.
   *
   * By default, we smartly determine the ownerDocument and defaultView
   * based on where `ChakraProvider` is rendered.
   */
  environment?: EnvironmentProviderProps["environment"]
}

/**
 * The global provider that must be added to make all Chakra components
 * work correctly
 */
export const ChakraProvider: React.FC<ChakraProviderProps> = (props) => {
  const {
    children,
    colorModeManager,
    portalZIndex,
    resetCSS = true,
    theme = {},
    environment,
    cssVarsRoot,
  } = props

  const _children = (
    <EnvironmentProvider environment={environment}>
      {children}
    </EnvironmentProvider>
  )

  const selector = typeof resetCSS === "string" ? resetCSS : undefined
  const cssReset = resetCSS ? <CSSReset selector={selector} /> : null

  return (
    <IdProvider>
      <ThemeProvider theme={theme as Dict} cssVarsRoot={cssVarsRoot}>
        <ColorModeProvider
          colorModeManager={colorModeManager}
          options={theme.config}
        >
          {cssReset}
          <GlobalStyle />
          {portalZIndex ? (
            <PortalManager zIndex={portalZIndex}>{_children}</PortalManager>
          ) : (
            _children
          )}
        </ColorModeProvider>
      </ThemeProvider>
    </IdProvider>
  )
}
