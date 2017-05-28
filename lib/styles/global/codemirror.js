import React from 'react'
import {
  monospacedFontFamily,
  focusColor,
  borderColor,
  placeholderColor
} from '../variables'

export default () => (<style jsx global>{`
  .CodeMirror-scroll {
    padding-bottom: 4em !important;
    border-radius: 4px;
  }
  .cm-s-github-light.CodeMirror {
    background: #fff;
    color: #333; }

  .cm-s-github-light .CodeMirror-gutters {
    background: #fff;
    border-right: 1px solid ${borderColor}; }

  .cm-s-github-light .CodeMirror-guttermarker {
    color: white; }

  .cm-s-github-light .CodeMirror-guttermarker-subtle {
    color: #d0d0d0; }

  .cm-s-github-light .CodeMirror-linenumber {
    color: ${placeholderColor};
    padding: 0 10px 0 10px; }

  .cm-s-github-light .CodeMirror-cursor {
    border-left: 1px solid #333; }

  .cm-s-github-light .CodeMirror-selected,
  .cm-s-github-light .CodeMirror-line::selection,
  .cm-s-github-light .CodeMirror-line > span::selection,
  .cm-s-github-light .CodeMirror-line > span > span::selection,
  .cm-s-github-light .CodeMirror-line::-moz-selection,
  .cm-s-github-light .CodeMirror-line > span::-moz-selection,
  .cm-s-github-light .CodeMirror-line > span > span::-moz-selection {
    background-color: #B2D7FE !important; }
  .CodeMirror.CodeMirror-focused .CodeMirror-selected  { background-color: #B2D7FE !important; }
  .CodeMirror .CodeMirror-selected  { background-color: inherit !important; }

  .CodeMirror.CodeMirror-focused {
    border-color: ${focusColor};
  }

  .CodeMirror.CodeMirror-focused .CodeMirror-gutters{
    border-color: ${focusColor};
  }

  .cm-s-github-light .CodeMirror-activeline-background {
    background: #f5f5f5; }

  .cm-s-github-light .CodeMirror-matchingbracket {
    text-decoration: underline;
    color: #333 !important; }

  .cm-s-github-light .CodeMirror-lines {
    font-family: ${monospacedFontFamily};
    font-size: 1em;
    background: #fff;
    line-height: 1.5em; }

  .cm-s-github-light .cm-comment {
    color: #969896; }

  .cm-s-github-light .cm-constant {
    color: #0086b3; }

  .cm-s-github-light .cm-entity {
    font-weight: normal;
    font-style: normal;
    text-decoration: none;
    color: #795da3; }

  .cm-s-github-light .cm-keyword {
    font-weight: normal;
    font-style: normal;
    text-decoration: none;
    color: #a71d5d; }

  .cm-s-github-light .cm-storage {
    color: #a71d5d; }

  .cm-s-github-light .cm-string {
    font-weight: normal;
    font-style: normal;
    text-decoration: none;
    color: #183691; }

  .cm-s-github-light .cm-support {
    font-weight: normal;
    font-style: normal;
    text-decoration: none;
    color: #0086b3; }

  .cm-s-github-light .cm-variable {
    font-weight: normal;
    font-style: normal;
    text-decoration: none;
    color: #ed6a43; }
`}</style>)
