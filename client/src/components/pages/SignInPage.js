import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signinUser} from '../../actions';
import { withRouter } from "react-router-dom";



class SignInPage extends Component {
handleFormSubmit({email, password}){
 console.log(email,password);
 this.props.signinUser({email, password})
}

  render() {

    const {handleSubmit, fields:{email, password}} = this.props;
    return <div className="login">
        <form className="form__group" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset>
            <label className="form__label">Email:</label>
            <input className="form__input" {...email} />
          </fieldset>
          <fieldset>
            <label className="form__label">Password:</label>
            <input className="form__input" {...password} />
          </fieldset>
          <button action="submit" className="btn btn-primary">
            Sign in
          </button>
        </form>
      </div>;
  }
}


export default reduxForm({
  form:'signin',
  fields:['email','password']
})(
  connect(null,{signinUser})(withRouter(SignInPage))
);
