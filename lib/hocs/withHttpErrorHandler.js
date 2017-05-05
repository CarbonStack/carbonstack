import React from 'react'
import Router from 'next/router'

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
        console.log(ctx)
        switch (error.status) {
          case 401:
            if (ctx.res) {
              ctx.res.writeHead(302, { Location: '/login?redirectTo=' + encodeURIComponent(ctx.asPath) })
              ctx.res.end()
            } else {
              Router.push({
                pathname: '/login',
                query: {
                  redirectTo: ctx.asPath
                }
              })
            }
        }

        return {
          httpError: {
            status: error.status,
            message: error.message
          }
        }
      }
    }

    handleError (error) {
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
