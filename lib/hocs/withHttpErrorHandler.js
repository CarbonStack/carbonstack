import React from 'react'
import Router from 'next/router'

const isBrowser = typeof window !== 'undefined'

function httpErrorHandler (PageComponent) {
  return class ErrorContainer extends React.PureComponent {
    static async getInitialProps (ctx) {
      try {
        const pageProps = typeof PageComponent.getInitialProps === 'function'
          ? await PageComponent.getInitialProps(ctx)
          : {}

        return pageProps
      } catch (error) {
        // Only handle http error
        if (!error.isHttpError) throw error

        return {
          httpError: {
            status: error.status,
            message: error.message
          }
        }
      }
    }

    handleError (error) {
      switch (error.status) {
        case 401:
          if (isBrowser) {
            Router.replace({
              pathname: '/login',
              query: {
                redirectTo: window.location.href
              }
            })
          }
          return null
      }
      return <div>
        <h1>Oops!! {error.status}</h1>
        <p>{error.message}</p>
      </div>
    }

    render () {
      const { httpError } = this.props

      if (httpError != null) return this.handleError(httpError)
      return <PageComponent {...this.props} />
    }
  }
}

export default httpErrorHandler
