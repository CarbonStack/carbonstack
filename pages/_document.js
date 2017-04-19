import Document, {
  Head,
  Main,
  NextScript
} from 'next/document'
import styleSheet from 'styled-components/lib/models/StyleSheet'
import '../lib/styles'
import 'isomorphic-fetch'
import store from '../lib/redux/store'

export default class MyDocument extends Document {
  static async getInitialProps ({renderPage}) {
    const page = renderPage()

    const styles = (
      <style
        dangerouslySetInnerHTML={{
          __html: styleSheet.rules().map(rule => rule.cssText).join('\n')
        }}
      />
    )

    const initStoreState = store.getState()

    return {
      ...page,
      styles,
      script: `window.__REDUX_INITIAL_STATE__=${JSON.stringify(initStoreState)}`
    }
  }

  render () {
    return (
      <html>
        <Head />
        <body>
          <script
            id='redux-ssr'
            dangerouslySetInnerHTML={{
              __html: this.props.script
            }}
          />
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
