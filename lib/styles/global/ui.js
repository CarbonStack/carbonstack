import { css } from 'styled-components'
import {
  borderColor,
  focusColor,
  placeholderColor,
  linkColor,
  monospacedFontFamily
} from '../variables'

export default css`
h1, h2, h3, h4, h5 {
  font-family: ${monospacedFontFamily};
  font-weight: normal;
}

.markdown-body {
  h1, h2, h3, h4, h5 {
    font-family: inherit;
    font-weight: bold;
  }
}

::-moz-selection { background: #B2D7FE; }
::selection { background: #B2D7FE; }

input[type=text], textarea {
  border: 1px solid ${borderColor};
  outline: none;
  border-radius: 4px;
  padding: 5px 10px;
}

input[type=text]:focus, textarea:focus {
  border-color: ${focusColor};
}

input::placeholder {
  color: ${placeholderColor};
}

button, select {
  background-color: white;
  border: 1px solid ${borderColor};
  outline: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #EEE;
}
button:active, button.active {
  background-color: ${linkColor};
  border-color: ${focusColor};
  color: white;
}
button:focus, select:focus {
  border-color: ${focusColor};
}

button.primary {
  border: #31C653;
  background-color: #31C653;
  color: white;
}
button.primary:hover {
  background-color: #28B94C;
}
button.primary:active {
  background-color: #279F43;
  border-color: ${linkColor};
}
button.primary:focus {
  border-color: ${linkColor};
}
`
