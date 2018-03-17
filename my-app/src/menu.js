import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class MainMenu extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            zones: [],
        };

        //this.handleChangeScene = this.handleChangeScene.bind(this);
        this.changeSceneStatus = this.changeSceneStatus.bind(this);
        
    }

    componentWillMount(){
        /* obtenemos las zonas */
        var zoneList = [];
        fetch("http://127.0.0.1:8000/zones/")
        .then(results => results.json())
        .then((json) => this.setState( {zones: json.zones
        }));
        this.setState({zones: zoneList});
        console.log("se supone que anduvoooo");
        /* obtenemos las escenas */
        var sceneList = [];
        fetch("http://127.0.0.1:8000/scenes/")
        .then(results => results.json())
        .then((json) => this.setState( {zones: json.scenes
        }));
        this.setState({scenes: sceneList});
        console.log("se supone que anduvoooo");
    }

    changeSceneStatus(e) {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
        fetch("http://127.0.0.1:8000/sceneStatus/"+this.state.id+"/")
        .then(response => {return response.json()})
        .then((json) => this.setState(
            { result: !json.result, errorMessage: json.errorMessage}));
    }

    render(){
        let zoneList = this.state.zones;
        return (
            <div className="windowContainer-main-menu">
                <div>
                    <div>
                        <label> Zonas </label>
                    </div>
                    <div>
                    {
                        zoneList.map(item =>
                        <button className="" key={item.id} value={item.name} onClick={navigateZone}/>)
                    }
                    </div>
                </div>
                <div>
                    <div>
                        <label> Escenas </label>
                    </div>
                    <div>
                    {
                        sceneList.map(item =>
                        <Scene key={item.id} value={item.name} onClick={changeSceneStatus}/>)
                    }
                    </div>
                </div>
            </div>
        );
    }
     

}

class Scene extends React.Component{
    constructor(props){
        super(props);
        // en props: id y name

        this.state = {
            active: false,
        }

        // tiene que saber mostrarse de forma activada o desactivada
        // el handle en el onlclick puede estar aca o tiene que ir al menu?


    }
}

export default MainMenu;