import {
  baseFontPixelSize
} from './variables'

export const mediumBreakpoint = 640 / baseFontPixelSize
export const largeBreakpoint = 1024 / baseFontPixelSize
export const xLargeBreakpoint = 1200 / baseFontPixelSize
export const xxLargeBreakpoint = 1440 / baseFontPixelSize

const media = {
  small: style => `
    @media screen and (max-width: ${mediumBreakpoint - 1 / baseFontPixelSize}em) {
      ${style}
    }
  `,
  medium: style => `
    @media screen and (min-width: ${mediumBreakpoint}em) and (max-width: ${largeBreakpoint - 1 / baseFontPixelSize}em) {
      ${style}
    }
  `,
  large: (style) => `
    @media screen and (min-width: ${largeBreakpoint}em) and (max-width: ${xLargeBreakpoint - 1 / baseFontPixelSize}em) {
      ${style}
    }
  `,
  xlarge: (style) => `
    @media screen and (min-width: ${xLargeBreakpoint}em) and (max-width: ${xxLargeBreakpoint - 1 / baseFontPixelSize}em) {
      ${style}
    }
  `,
  xxlarge: (style) => `
    @media screen and (min-width: ${xxLargeBreakpoint}em) {
      ${style}
    }
  `
}

export default media
