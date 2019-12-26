import React from 'react';

export default class AddForm extends React.Component {

    id = null;
    edit = false;
    editable = true;

    constructor(props) {
        super(props);
        if(props.match.params && props.match.params.id){
            this.id = props.match.params.id
        }
        if(this.id && props.match.path.indexOf('/edit/') != -1){
            this.edit = true
        }
        if(props.match.path.indexOf('/detail/') != -1){
            this.editable = false
        }
    }

    initPropState = () =>{
        if(this.edit){
            return {
                id: this.props.match.params.id,
                loading: true,
                value: {
                    ...this.props.match.params,
                    ...this.props.location.state
                }
            }
        }
        return {
            loading: false,
            value: { ...this.props.match.params }
        }
    }

    validateAll = (values) => {
        if(!this.editable){ return false }
        if(this.edit){
            if(this.id != values.id){ return false }
            if(this.id == null){ return false }
        }
        return true
    }

    render(){
        return null
    }
}