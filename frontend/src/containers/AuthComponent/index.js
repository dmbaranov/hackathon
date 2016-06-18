import React from 'react'
import { connect } from 'react-redux'

export default function requireAuthentication(Component) {

    class AuthComponent extends React.Component {
        render = () => {
            return (
                <div>
                    {this.props.user.isAuthenticated === true
                        ? <Component { ...this.props } />
                        : <p>No access</p>
                    }
                </div>
            )
        }
    }

    function mapStateToProps(state) {
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthComponent)
}

