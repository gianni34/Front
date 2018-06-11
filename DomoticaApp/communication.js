
export default class Communication {
    constructor(){
        this.users = [{name:"Ceci", id:1, password:'123456', isAdmin: true, question: '¿Respuesta? resp', answer: 'resp'},
        {name:"Pali", id:2, password:'123456', isAdmin: false, question: '¿Respuesta? resp', answer: 'resp'},
        {name:"Negra", id:3, password:'123456', isAdmin: false, question: '¿Respuesta? resp', answer: 'resp'},
        {name:"Eugi", id:4, password:'123456', isAdmin: false, question: '¿Respuesta? resp', answer: 'resp'}];
        
        this.zones = [{ name: 'Living', id: 1, type: 'living' },
        { name: 'Comedor', id: 2, type: 'dining' },
        { name: 'Baño principal', id: 3, type: 'bathroom', },
        { name: 'Pasillo', id:4, type: 'hallway',  },
        { name: 'Living 2', id:5, type: 'living',  }];
        
        this.scenes = [{ id: 1, name: 'A trabajar', }, 
        {id: 2, name: 'A la choza', }];
        
        this.artifacts = [{id: 1, name: 'Luz entrada', zoneId: 1,  on:true, type: 'lightSwitch'}, 
        {id: 2, name: 'Luz sillón', zoneId: 1, on:true, type: 'lightDimmer'}, 
        {id: 3, name: 'Aire tele', zoneId: 1, on:true, type: 'AC'}];

        this.variables = [{id: 1, name: '', artifactId: 2, value: 50, type: 'dimmerSwitch', min:0, max: 100, minIcon: 'light-down', maxIcon: 'light-up'},
        {id: 2, name: '', artifactId: 3, value: 3, type: 'iconButtons', min: 1, max: 5, minIcon:'', maxIcon: ''},
        {id: 3, name: 'Temperatura', artifactId: 3, value: 22, type: 'dimmerValue', min:16, max: 30, minIcon:'', maxIcon: ''},
        {id: 4, name: 'Ventilador', artifactId: 3, value: 1, type: 'labelButtons', min: 1, max: 3, minIcon:'', maxIcon: ''}
        ]

        this.var_ranges = [{id: 1, name: 'Heat', type:'heat', variableId: 2},
        {id: 2, name: 'Cool', type:'cool', variableId: 2},
        {id: 3, name: 'Dry', type:'dry', variableId: 2},
        {id: 4, name: 'Fan', type:'fan', variableId: 2},
        {id: 5, name: 'Auto', type:'auto', variableId: 2},
        {id: 1, name: 'LOW', type:'low', variableId: 4},
        {id: 2, name: 'MED', type:'med', variableId: 4},
        {id: 3, name: 'HIGH', type:'high', variableId: 4},
        ]
        
        this.state = {
            
        }
    }

    static myInstance = null;

    _userID = "";
    _url = 'http://192.168.1.51:8000/';
    _IP = "";
    _role = "";
    

    static getInstance() {
        if (Communication.myInstance == null) {
            Communication.myInstance = new Communication();
        }

        return Communication.myInstance;
    }

    authenticate(user, password){
        result = this.users.filter(function(obj){
            return obj.name == user && obj.password == password;
        }).map(function({id, name, password, isAdmin, question, answer}){
            return {id, name, isAdmin};
        });
        if(result.length == 1){
            return true;
        }
        return false;
    }

    getSecretQuestion(user){
        result = this.users.filter(function(obj){
            return obj.name == user ;
        }).map(function({id, name, password, isAdmin, question, answer}){
            return {id, name, question};
        });
        if(result.length == 1){
            return result[0].question;
        }
        return '';
    }

    validateSecretAnswer(user, answer){
        result = this.users.filter(function(obj){
            return obj.name == user && obj.answer == answer;
        }).map(function({id, name, password, isAdmin, question, answer}){
            return {id, name, answer};
        });
        console.log(result);
        if (result.length == 1){
            console.log("ok");
            return true;
        }
        console.log("error");
        return false;
    }

    getZones(){
        /*url = this._url + 'zones/';
        zones = [];
        fetch(url)
        .then(results => results.json())
        .then((json) => (zones = json.zones))
        .catch((error) => {
            console.error(error);
        });*/
        return this.zones;
    }

    getZone(id){
        zones = this.zones.filter(function(obj){
            return obj.id == id;
        }).map(function({name, id, type}){
            return {name, id, type};
        });
        if(zones.lenght == 0)
            return null;
        return zones[0];
    }

    getScenes(){
       /* url = this._url + 'scenes/';
        scenes = [];
        fetch(url)
        .then(results => results.json())
        .then((json) => (scenes = json.scenes))
        .catch((error) => {
            console.error(error);
        });*/
        return this.scenes;
    }

    getUsers(id){
        return this.users.filter(function(obj){
            return obj.id == id;
        }).map(function({id, name, password, isAdmin, question, answer}){
            return {id, name, isAdmin};
        });
        /*url = this._url + 'users/';
        users = [];
        fetch(url)
        .then(results => results.json())
        .then((json) => (users = json.users))
        .catch((error) => {
            console.error(error);
        });*/
    }

    getUser(id){
        return this.users.filter(function(obj){
            return obj.id == id;
        }).map(function({id, name, password, isAdmin, question, answer}){
            return {id, name, password, isAdmin};
        });
    }

    createUser(name, password, isAdmin){
        users = this.users.filter(function(obj){
            return obj.name == name;
        }).map(function({id, name, password, isAdmin, question, answer}){
            return {id, name, password, isAdmin};
        });
        if(users.length > 0){
            return false;
        }
        id = this.user[this.users.length - 1].id + 1;
        user = {name: name, password: password, isAdmin: isAdmin, question: '¿Respuesta? resp', answer: 'resp' };
        this.users.push(user);
        return true;
    }

    updateUser(id, name, password, isAdmin){
        users = this.users.filter(function(obj){
            return obj.name == name && obj.id != id;
        }).map(function({id, name, password, isAdmin, question, answer}){
            return {id, name, password, isAdmin};
        });
        if(users.length > 0){
            return false;
        }
        for (user in this.users){
            if(user.id == id){
                user.name = name;
                user.password = password;
                user.isAdmin = isAdmin
                return true;
            }
        }
        return false;
    }

    deleteUser(id){
        this.users = this.users.filter(function(obj){
            return obj.id != id;
        }).map(function({id, name, password, isAdmin, question, answer}){
            return {id, name, isAdmin};
        });
        console.log("--------------- usuario eliminado -------------------");
    }

    getScene(id){
        /*url = this._url + 'scene/' + id + '/';
        scenes = [];
        fetch(url)
        .then(results => results.json())
        .then((json) => (scenes = json.scenes))
        .catch((error) => {
            console.error(error);
        });*/
        for (obj in this.scenes){
            if(obj.id == id){
                console.log(obj);
                return obj;
            }
        }
        return null;
    }

    getArtifacts(zoneId){
        return this.artifacts.filter(function(obj){
            return obj.zoneId == zoneId;
        }).map(function({id, name, zoneId, on, type}){
            return {id, name, zoneId, on, type};
        });
    }

    getArtifact(id){
        result = this.artifacts.filter(function(obj){
            return obj.id == id;
        }).map(function({id, name, zoneId, on, type}){
            return {id, name, zoneId, on, type};
        });
        return result[0];
    }
    
    getVariables(artifactId){
        console.log("getVariables: " + artifactId);
        return this.variables.filter(function(obj){
            return obj.artifactId == artifactId;
        }).map(function({id, name, artifactId, value, type, min, max, minIcon, maxIcon}){
            return {id, name, artifactId, value, type, min, max, minIcon, maxIcon};
        })

    }

    getVariable(id){
        result = this.variables.filter(function(obj){
            return obj.id == id;
        }).map(function({id, name, artifactId, value, type, min, max, minIcon, maxIcon}){
            return {id, name, artifactId, value, type, min, max, minIcon, maxIcon};
        });
        return result[0];
    }

    createScene(name, description, actions, ){
        scenes = this.scenes.filter(function(obj){
            return obj.name == name;
        }).map(function({id, name}){
            return {id, name};
        });
        if(scenes.length > 0){
            return false;
        }
        id = this.user[this.scenes.length - 1].id + 1;
        scene = {id: id, name: name, description: description, actions: actions, };
        this.users.push(user);
        return true;
    }

    updateScene(){

    }

    deleteScene(id){
        this.scenes = this.scenes.filter(function(obj){
            return obj.id !== id;
        });
    }

    getRanges(id){
        return this.var_ranges.filter(function(obj){
            return obj.variableId == id;
        }).map(function({id, name, variableId, type}){
            return {id, name, variableId, type};
        });
    }
    
    
    setValue(id, value){
        console.log("llego.. ")
        this.variables[id-1].value = value;
        console.log("variable: "+ this.variables[id-1].value);
        /*
        variables = this.variables.filter(function(obj){
            return obj.id == id;
        }).map(function({id, value}){
            return {id, value};
        });
        if(variables.length > 0){
            return false;
        }
        for (variable in this.variables){
            if(variable.id == id){
                variable.value;
                return true;
            }
        }
        return false;*/
    }

    turnOnOff(id, on){
        this.artifacts[id-1].on = on;
        console.log("prendido " + this.artifacts[id-1].on);
    }
};
