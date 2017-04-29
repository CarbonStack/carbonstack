import { css } from 'styled-components'

export const mediumBreakpoint = 640 / 16
export const largeBreakpoint = 1024 / 16
export const xLargeBreakpoint = 1200 / 16
export const xxLargeBreakpoint = 1440 / 16

const media = {
  small: (...args) => css`
    @media screen and (max-width: ${mediumBreakpoint - 0.0625}em) {
      ${css(...args)}
    }
  `,
  medium: (...args) => css`
    @media screen and (min-width: ${mediumBreakpoint}em) and (max-width: ${largeBreakpoint - 0.0625}em) {
      ${css(...args)}
    }
  `,
  large: (...args) => css`
    @media screen and (min-width: ${largeBreakpoint}em) and (max-width: ${xLargeBreakpoint - 0.0625}em) {
      ${css(...args)}
    }
  `,
  xlarge: (...args) => css`
    @media screen and (min-width: ${xLargeBreakpoint}em) and (max-width: ${xxLargeBreakpoint - 0.0625}em) {
      ${css(...args)}
    }
  `,
  xxlarge: (...args) => css`
    @media screen and (min-width: ${xxLargeBreakpoint}em) {
      ${css(...args)}
    }
  `
}

export default media
