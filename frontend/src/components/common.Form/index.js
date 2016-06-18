/*eslint-disable*/
import React, { Component } from 'react'

export default class Form extends Component {
    
    render = () => {
        let formData = this.props.data[0].map((item, number) => {
            return (
                <div key={ number }>
                    <span>{ item.name }</span><input type={ item.type } { ...item.attributes }/>
                </div>
            )
        });

        return (
            <form onSubmit={ this.props.data[1][0].formOnSubmit } >
                { formData }
                <button type={ this.props.data[1][0].buttonType }>{ this.props.data[1][0].buttonText }</button>
            </form>
        )
    };
    
}
/*eslint-enable*/