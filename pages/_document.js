import Document, {
  Head,
  Main,
  NextScript
} from 'next/document'
import globalStyle from '../lib/styles/global'

export default class MyDocument extends Document {
  render () {
    return (
      <html>
        <Head>
          <title>Carbon Stack</title>

          <meta name='description' content='A open wiki for developers' />

          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <meta name='theme-color' content='#ffffff' />

          <globalStyle.ui />
          <globalStyle.codemirror />
          <globalStyle.markdown />

          <link rel='icon' type='image/x-icon' href='https://unpkg.com/@carbonstack/favicon@0.0.1/assets/favicon.ico' />
          <link rel='apple-touch-icon' sizes='180x180' href='https://unpkg.com/@carbonstack/favicon@0.0.1/assets/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='https://unpkg.com/@carbonstack/favicon@0.0.1/assets/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='https://unpkg.com/@carbonstack/favicon@0.0.1/assets/favicon-16x16.png' />
          <link rel='manifest' href='https://unpkg.com/@carbonstack/favicon@0.0.1/assets/manifest.json' />
          <link rel='mask-icon' href='https://unpkg.com/@carbonstack/favicon@0.0.1/assets/safari-pinned-tab.svg' color='#5bbad5' />
          <link rel='stylesheet' href='https://unpkg.com/codemirror@5.25.2/lib/codemirror.css' />
          <link rel='stylesheet' type='text/css' href='https://unpkg.com/nprogress@0.2.0/nprogress.css' />
        </Head>
        <body>
          <Main />

          <script type='text/javascript' src='https://unpkg.com/codemirror@5.25.2/lib/codemirror.js' />
          <script type='text/javascript' src='https://unpkg.com/codemirror@5.25.2/mode/meta.js' />
          <script type='text/javascript' src='https://unpkg.com/codemirror@5.25.2/addon/mode/overlay.js' />
          <script type='text/javascript' src='https://unpkg.com/codemirror@5.25.2/addon/mode/loadmode.js' />
          <script type='text/javascript' src='https://unpkg.com/codemirror@5.25.2/keymap/sublime.js' />
          <script type='text/javascript' src='https://unpkg.com/codemirror@5.25.2/addon/runmode/runmode.js' />
          <script type='text/javascript' src='https://unpkg.com/codemirror@5.25.2/addon/edit/continuelist.js' />
          <script type='text/javascript' src='https://unpkg.com/codemirror@5.25.2/addon/display/placeholder.js' />
          <script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.4/socket.io.slim.min.js' />

          <NextScript />

        </body>
      </html>
    )
  }
}
