import React from 'react'
import { gql, graphql } from 'react-apollo'
import style from './App.css'
import AppTemplate from './templates/AppTemplate'

class Lists extends React.Component {
  render () {
    const txs = JSON.stringify([
      {
        date: '29 feb 2018',
        currency: 'BotC',
        title: 'You received 200 botc shares from Fernando Pessoa',
        tags: ['beer', 'Saturday night'],
      },
      {
        date: '29 feb 2018',
        currency: 'CCN',
        title: 'You received 200 botc shares from Fernando Pessoa',
        tags: ['beer', 'Saturday night'],
      },
      {
        date: '29 feb 2018',
        currency: 'FreedomCoop',
        title: 'You received 200 botc shares from Fernando Pessoa',
        tags: ['beer', 'Saturday night'],
      },
      {
        date: '29 feb 2018',
        currency: 'BotC',
        title: 'You received 200 botc shares from Fernando Pessoa',
        tags: ['beer', 'Saturday night'],
      }
    ])
    const {loading, error, data} = this.props
    return (
    <AppTemplate>
      {loading ? <strong>Loading...</strong> : (
      error ? <p style={{ color: '#F00' }}>API error</p> : (
        <div className={style.App}>
          <div className={style.assets}>
            <h5>Your assets</h5>
            <div className={style.assets_list}>
              <span>Faircoin</span>
              <span className={style.list_active}>Shares</span>
            </div>
            <h4>Logout</h4>
          </div>
          <div className={style.profile}>
            <div className={style.profile_agent}>
              <img src='https://picsum.photos/200' />
              <h2>Bernini</h2>
            </div>
            <div className={style.profile_info}>
              <div className={style.info_data}>
                <div className={style.data_box}>
                  <h3>200</h3>
                  <h5>Balance</h5>
                </div>
                <div className={style.data_box}>
                  <h3>5</h3>
                  <h5>Shares</h5>
                </div>
              </div>
              <div className={style.info_list}>
                <div className={style.list_share}>
                  <span>120</span>
                  <h5>FreedomCoop</h5>
                </div>
                <div className={style.list_share}>
                  <span>40</span>
                  <h5>Bank of the commons</h5>
                </div>
                <div className={style.list_share}>
                  <span>40</span>
                  <h5>CCN</h5>
                </div>
              </div>
            </div>
          </div>
          <div className={style.sendTx_form}>
            <h5>Send transaction</h5>
            <oce-sendTx />
          </div>
          <div>
            <oce-txs txs={txs} />
          </div>
        </div>
      ))}
    </AppTemplate>
    )
  }
}

const agentPlans = gql`
query ($token: String) {
    viewer(token: $token) {
      myAgent {
        id
        name
        faircoinAddress
        image
        agentEconomicEvents {
          note
          action
          provider {
            image
            name
          }
          inputOf {
            name
          }
          receiver {
            name
          }
          start
          note
          affectedQuantity {
            numericValue
            unit {
              name
            }
          }
        }
        agentCommitments(latestNumberOfDays: 30) {
          id
          action
          plannedStart
          committedOn
          due
          committedQuantity {
            numericValue
            unit {
              name
            }
          }
          resourceClassifiedAs {
            name
            category
          }
          provider {
            id
            name
          }
          receiver {
            id
            name
          }
          note
        }
        agentRelationships {
          relationship {
            label
            category
          }
          object {
            id
            name
            note
            image
          }
        }
        agentPlans {
          name
          id
          note
          scope {
            id
            name
          }
          planProcesses {
            name
            committedInputs {
              id
              note
              action
            }
            note
          }
        }
      }
    }
  }  
`

export default graphql(agentPlans, {
  options: (props) => ({variables: {
    token: localStorage.getItem('token')
}})
})(Lists)
