import React from 'react'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'

import './style.scss'

export default function requireAuthentication(Component) {

    class AuthComponent extends React.Component {
        render = () => {
            return (
                <div>
                    {this.props.login.User.isAuthenticated === true
                        ? <Component { ...this.props } />
                        : <Col componentClass="div" xs={ 12 } className="no-access">No access!</Col>
                    }
                </div>
            )
        }
    }

    function mapStateToProps(state) {
        return {
            login: state.login
        }
    }

    return connect(mapStateToProps)(AuthComponent)
}

