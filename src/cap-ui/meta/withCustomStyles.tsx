import { Dynamic } from 'solid-js/web'
import { JSX } from 'solid-js'

export const withCustomStyles =
  <S, T>(Component: (props: T) => JSX.Element, stylesOverride: S) =>
  (props: T) =>
    <Dynamic component={Component} {...props} stylesOverride={stylesOverride} />
