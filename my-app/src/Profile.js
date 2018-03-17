import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';

class Profile extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            name: '',
            password: '',
            secretQuestion: '',
            secretAnswer: '',
            passwordConfirmation: '',
            role: '',
            data: '',
            submittable: false,
            modified: false,
            errorMessage: false,
            profile: false,
            saved: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleLogedIn = this.handleLogedIn.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentWillMount(){
        fetch("http://127.0.0.1:8000/user/2/")
        .then(response => {return response.json()})
        .then((json) => this.setState(
            {userId: json.id, name: json.name, role: json.role, password: json.password, passwordConfirmation: json.password, secretQuestion: json.question, secretAnswer: json.answer}));
            this.setState({submittable: true})
    }


    handleLogedIn(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
        this.setState({submittable: false});
        fetch("http://127.0.0.1:8000/logged/"+this.state.name+"/")
        .then(response => {return response.json()})
        .then((json) => this.setState({ logedIn: json.result }));
        this.setState({errorMessage: !this.state.logedIn });
        console.log("esta logueado");
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ submittable: false});
        if (this.state.password && this.state.name && this.state.secretAnswer && this.state.passwordConfirmation){
            if (this.state.password.length > 8){
                if (this.state.password===this.state.passwordConfirmation){
                    this.setState({ submittable: true});
                    console.log("las contr son iguales");
                }
            }
        }
    }

    handleSave(e) {
        e.preventDefault();
        console.log("llego a handle de save");
        this.state.data = '{"name": "'+this.state.name+'", "password": "'+this.state.password+'", "question": "'+this.state.secretQuestion+'", "answer": "'+this.state.secretAnswer+'"}'
        const { name, value } = e.target;
        this.setState({ [name]: value });
        fetch("http://127.0.0.1:8000/user/"+this.state.userId+"/",{
            method: 'PUT',
            body: this.state.data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {return response.json()})
        .then((json) => this.setState({ saved: json.result }));
        this.setState({errorMessage: !this.state.saved });
        console.log("se hizo el fecth y guardo = "+this.state.saved);    
    }

    render(){
      const { name, errorMessage, password, passwordConfirmation, secretAnswer, submittable, secretQuestion } = this.state;
      //if (logedIn){
        return (
                <div className="windowContainer-login">
                    <div className="logoContainer-login">
                        <img src="domotica.png" width="500px"/>
                    </div>
                    <form className="formContainer-login">
                        
                        <div>
                            <input type="text" id="name" className="input-login" name="name" value={name} placeholder="Nombre de usuario" onChange={this.handleChange}/>
                        </div>
                        <div>
                            <input type="password" id="password" className="input-login" name="password" value={password} placeholder="contraseña" onChange={this.handleChange}/>
                        </div>
                        <div>
                            <input type="password" id="passwordConfrimation" className="input-login" name="passwordConfirmation" value={passwordConfirmation} placeholder="confirmación de contraseña" onChange={this.handleChange}/>
                        </div>
                        <div>
                            <input type="text" disabled="True" id="secretQuestion" className="input-login" name="secretQuestion" value={secretQuestion} placeholder="" onChange={this.handleChange}/>
                        </div>
                        <div>
                            <input type="text" id="secretAnswer" className="input-login" name="secretAnswer" value={secretAnswer} placeholder="Respueta secreta" onChange={this.handleChange}/>
                        </div>
                        { submittable && (<div>
                            <input type="submit" className="input-button-login" value="Guardar" onClick={this.handleSave} />                            
                            </div>)
                        } 
                    </form>
                </div>
      
            );
        //}
    }
};

export default Profile;