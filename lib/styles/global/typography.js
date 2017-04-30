import { css } from 'styled-components'
import {
  textColor,
  linkColor,
  monospacedFontFamily,
  sansSerifFontFamily
} from '../variables'

// from http://type-scale.com/
export default css`
html {font-size: 16px;}

body {
  background-color: white;
  font-family: ${sansSerifFontFamily};
  font-weight: 400;
  line-height: 1.45;
  color: ${textColor};
}

p {margin-bottom: 1.3em;}

h1, h2, h3, h4 {
  margin: 1.414em 0 0.5em;
  font-weight: inherit;
  line-height: 1.2;
  font-family: ${monospacedFontFamily};
}

h1 {
  margin-top: 0;
  font-size: 3.998em;
}

h2 {font-size: 2.827em;}

h3 {font-size: 1.999em;}

h4 {font-size: 1.414em;}

small, .font_small {font-size: 0.707em;}

pre, code {
  font-family: ${monospacedFontFamily};
}

a {
  color: ${linkColor};
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
`
