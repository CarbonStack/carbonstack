import Document, {
  Head,
  Main,
  NextScript
} from 'next/document'
import styleSheet from 'styled-components/lib/models/StyleSheet'
import '../lib/styles'

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

    return {
      ...page,
      styles
    }
  }

  render () {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
