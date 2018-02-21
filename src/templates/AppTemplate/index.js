import * as React from 'react'
import { gql, graphql } from 'react-apollo'
import AuthenticatedOnly from '../../AuthenticatedOnly'
import Login from '../../login'
// import Header from '../../components/header'
import style from './style.css'
import { withRouter } from 'react-router'

class AppTemplate extends React.Component {
  render () {
    return (
      <AuthenticatedOnly unauthenticatedComponent={<Login />}>
        <div >
          <div className={style.container}>
            {this.props.children}
          </div>
        </div>
      </AuthenticatedOnly>
    )
  }
}

const App = withRouter(AppTemplate)

export default App
