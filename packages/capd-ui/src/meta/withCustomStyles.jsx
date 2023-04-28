import { Dynamic } from 'solid-js/web';
export const withCustomStyles = (Component, stylesOverride) => (props) => <Dynamic component={Component} {...props} stylesOverride={stylesOverride}/>;
