import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MainMenu from './menu';

class Login extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        // this.props.dispatch(userActions.logout());

        this.state = {
            user: '',
            password: '',
            submittable: false,
            logedIn: false,
            errorMessage: false,
            changePassword: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount(){

    }
    
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        if (this.state.user.length > 0 && this.state.password.length > 4)
            this.setState({ submittable: true});
        else 
            this.setState({ submittable: false});
    }

    handleForgotPassword(e){
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({changePassword: true});
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("llego a handle submit cambio psswrd");
        const { name, value } = e.target;
        this.setState({ [name]: value });
        fetch("http://192.168.1.46:8000/login/"+this.state.user+"/"+this.state.password+"/")
        .then(response => {return response.json()})
        .then((json) => this.setState({ logedIn: json.result, idUser: json.id }));
        this.setState({errorMessage: !this.state.logedIn });
        console.log("se hizo el fecth y logedIn = "+this.state.logedIn);     
    }

    render(){
      const { user, password, submittable, logedIn, errorMessage, changePassword, idUser } = this.state;
      if (logedIn){
        return (<MainMenu />);
      }
      if(changePassword && !logedIn)
        return (<EnterUser/>);
      return (
            <div className="windowContainer-login">
                <div className="logoContainer-login">
                    <img src="domotica.png" width="500px"/>
                </div>
                <form className="formContainer-login">
                    { errorMessage && (<div className="errorMessage" id="login">
                        <p>No hemos encontrado esa combinación de usuario y contraseña. Si no recuerda su contraseña ingrese a Olvidé mi contraseña.</p>
                    </div>)
                    }
                    <div>
                        <input type="text" id="username" className="input-login" name="user" value={user} placeholder="nombre de usuario" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <input type="password" id="password" className="input-login" name="password" value={password} placeholder="contraseña" onChange={this.handleChange}/>
                    </div>
                    { submittable && (<div>
                        <input type="submit" className="input-button-login" value="Login" onClick={this.handleSubmit} />                            
                        </div>)
                    } 
                    <a className="link-login" onClick={this.handleForgotPassword}>OLVIDÉ MI CONTRASEÑA</a>
                </form>
            </div>
      );
    }
};

class EnterUser extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        // this.props.dispatch(userActions.logout());

        this.state = {
            user: '',
            init: true,
            submittable: false,
            errorMessage: false,
            secretQuestion: false,
            question: '',
            answer: '',
            changePassword: false,
            passwordNew: '',
            idUser: '0',
            passwordUpdated: false,
            newPassword: '',
            newPasswordRepeat: ''
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmitUsername = this.handleSubmitUsername.bind(this);
        this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
        this.handleSubmitSave = this.handleSubmitSave.bind(this);
    }

    componentWillUnmount(){

    }
    
    handleChangeUsername(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        if (this.state.user)
            this.setState({ submittable: true});
        else 
            this.setState({ submittable: false});
    }

    handleChangeAnswer(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        if (this.state.answer)
            this.setState({ submittable: true});
        else 
            this.setState({ submittable: false});
    }

    handleSubmitUsername(e) {
        e.preventDefault();
        console.log("llego a handle submit");
        const { name, value } = e.target;
        this.setState({ [name]: value });
        fetch("http://192.168.1.46:8000/userQuestion/"+this.state.user+"/")
        .then(response => {return response.json()})
        .then((json) => this.setState(
            { question: json.question, errorMessage: !json.result, init: !json.result, secretQuestion: json.result}));  
            this.setState({submittable: !this.state.secretQuestion});
    }

    handleSubmitAnswer(e) {
        e.preventDefault();
        console.log("llego a handle submit answer");
        const { name, value } = e.target;
        this.setState({ [name]: value });
        fetch("http://127.0.0.1:8000/userAnswer/"+this.state.user+"/"+this.state.answer+"/")
        .then(response => {return response.json()})
        .then((json) => this.setState(
            { secretQuestion: !json.result, submittable: !json.result, changePassword: json.result, errorMessage: !json.result}));
        console.log(" usuario con nombre: "+this.state.user);
       // this.setState({ submittable: this.state.secretQuestion });
        console.log(" submittable: "+this.state.submittable);
       // this.setState({ changePassword: !this.state.secretQuestion });
        console.log(" changePassword: "+this.state.changePassword);
       // this.setState({ errorMessage: !this.state.secretQuestion });
        console.log(" secretQuestion: "+this.state.secretQuestion);
    }

    handleChangePassword(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ submittable: false});
        if (this.state.newPassword && this.state.newPasswordRepeat){
            if (this.state.newPassword.length > 4){
                if (this.state.newPassword===this.state.newPasswordRepeat){
                    this.setState({ submittable: true});
                    console.log("las contr son iguales");
                }
            }
        }
    }

    handleSubmitSave(e) {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
        fetch("http://127.0.0.1:8000/changePassword/"+this.state.user+"/"+this.state.newPassword)
        .then(response => {return response.json()})
        .then((json) => this.setState(
            { passwordUpdated: json.result})
        );  
        this.setState({submittable: !this.state.passwordUpdated});
        this.setState({changePassword: !this.state.passwordUpdated});
        this.setState({errorMessage: !this.state.passwordUpdated});
    }

    render(){
      const { user, submittable, errorMessage, secretQuestion, question, answer, changePassword, init, idUser, newPassword, newPasswordRepeat, passwordUpdated} = this.state;
      if(init){
        return (
            <div className="windowContainer-login">
                <div className="logoContainer-login">
                    <img src="domotica.png" width="500px"/>
                </div>
                <form className="formContainer-login">
                    { errorMessage && (<div className="errorMessage" id="login">
                        <p>No se encontró un usuario con ese nombre.</p>
                    </div> )}   
                    <div>
                        <input type="text" id="username" className="input-login" name="user" value={user} placeholder="nombre de usuario" onChange={this.handleChangeUsername}/>
                    </div>
                    { submittable && (
                    <div>
                        <input type="submit" className="input-button-login" value="Enviar" onClick={this.handleSubmitUsername} />                            
                    </div>
                    )}
                    <label>{submittable}</label>
                </form>
            </div>
        );
      }
      else if(secretQuestion){
        return (
            <div className="windowContainer-login">
                <div className="logoContainer-login">
                    <img src="domotica.png" width="500px"/>
                </div>
                <form className="formContainer-login">
                    { errorMessage && (<div className="errorMessage" id="login">
                        <p>La respuesta es incorrecta, intente nuevamente.</p>
                    </div> )}   
                    <div>
                        <input type="text" className="input-login" name="question" value={question} disabled="true"/>
                    </div>
                    <div>
                        <input type="text" className="input-login" name="answer" value={answer} placeholder="respuesta..." onChange={this.handleChangeAnswer}/>
                    </div>
                    { submittable && (
                    <div>
                        <input type="submit" className="input-button-login" value="Enviar" onClick={this.handleSubmitAnswer} />                            
                    </div>
                    )}
                </form>
            </div>
        );
      }
      else if(changePassword){
        return (
            <div className="windowContainer-login">
                <div className="logoContainer-login">
                    <img src="domotica.png" width="500px"/>
                </div>
                <form className="formContainer-login">
                    { errorMessage && (<div className="errorMessage" id="login">
                        <p>Se produjo un error al actualizar su contraseña, por favor intente nuevamente.</p>
                    </div> )}   
                    <div>
                        <input type="password" id="password" className="input-login" name="newPassword" value={newPassword} placeholder="nueva contraseña" onChange={this.handleChangePassword}/>
                    </div>
                    <div>
                        <input type="password" id="password" className="input-login" name="newPasswordRepeat" value={newPasswordRepeat} placeholder="repita contraseña" onChange={this.handleChangePassword}/>
                    </div>
                    { submittable && (
                    <div>
                        <input type="submit" className="input-button-login" value="Guardar" onClick={this.handleSubmitSave} />                            
                    </div>
                    )}
                </form>
            </div>
        );
      }
      else if (passwordUpdated){
          return (<h1>Se actuaalizó la contraseña..</h1>);
      }
    }

};

ReactDOM.render(
    <Login />,
    document.getElementById('root')
  );

