import { AsyncStorage } from 'react-native';


export default class Communication {
    constructor(){
        this.users = [{name:"Ceci", id:1, password:'123456', isAdmin: true, question: '¿Respuesta? resp', answer: 'resp', image: 'default.png'},
        {name:"Pali", id:2, password:'123456', isAdmin: false, question: '¿Respuesta? resp', answer: 'resp', image: ''},
        {name:"Negra", id:3, password:'123456', isAdmin: false, question: '¿Respuesta? resp', answer: 'resp'},
        {name:"Eugi", id:4, password:'123456', isAdmin: false, question: '¿Respuesta? resp', answer: 'resp'}];
        
        this.zones = [{ name: 'Living', id: 1, type: 'living' },
        { name: 'Comedor', id: 2, type: 'dining' },
        { name: 'Baño principal', id: 3, type: 'bathroom', },
        { name: 'Pasillo', id:4, type: 'hallway',  },
        { name: 'Living 2', id:5, type: 'living',  }];
        
        this.scenes = [
        { id: 1, name: 'A trabajar', description: 'Se apaga el aire acondicionado a las 8:30 am de L. a V.', actions: [{id: 1, zoneId: 1, artifactId:3, variableId: 0, value: 0}], onDemand: true, timeCondition: true, days: [0,1,2,3,4], time: '16:00',  },
        ];


        
        this.artifacts = [{id: 1, name: 'Luz entrada', zoneId: 1,  on:true, type: 'lightSwitch'}, 
        {id: 2, name: 'Luz sillón', zoneId: 1, on:true, type: 'lightDimmer'}, 
        {id: 3, name: 'Aire tele', zoneId: 1, on:true, type: 'AC'}];

        this.variables = [{id: 1, name: 'Intensidad', artifactId: 2, value: 50, type: 'dimmerSwitch', min:0, max: 100, minIcon: 'light-down', maxIcon: 'light-up'},
        {id: 2, name: 'Modo', artifactId: 3, value: 3, type: 'iconButtons', min: 1, max: 5, minIcon:'', maxIcon: ''},
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

   /* _getUserId(){
        const idToken = AsyncStorage.getItem('idToken');
        return idToken ? parseInt(idToken,10): 0
    };*/

    authenticate(user, password){
        result = this.users.filter(function(obj){
            return obj.name == user && obj.password == password;
        }).map(function({id, name, password, isAdmin, question, answer}){
            return {id, name};
        });
        if (result.length == 1){
            console.log(" authenticate con id "+result[0].id );
            return true;
            //return {ok:true, id: result[0].id};
        } else {
            return false;
        }
        //return {ok: false, id: 0};
    }

    isAdmin(){
        id = this._getUserId();
        if (id > 0){
            console.log(" request isAdmin con id: "+id);
            result = this.users.filter(function(obj){
                return obj.id == id;
            }).map(function({id, name, password, isAdmin, question, answer}){
                return {id, isAdmin};
            });
            if(result.length == 1){
                return result[0].isAdmin;
            }
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
        }).map(function({name, id, password, isAdmin, question, answer}){
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
            return obj.id != id;
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
        result =this.users.filter(function(obj){
            return obj.id == id;
        }).map(function({id, name, password, isAdmin, question, answer}){
            return {id, name, password, isAdmin};
        });
        return result[0];
    }

    createUser(name, password, isAdmin){
        users = this.users.filter(function(obj){
            return obj.name == name;
        }).map(function({id, name, password, isAdmin, question, answer}){
            return {id, name, password, isAdmin};
        });
        if(users.length > 0){
            console.log(" nombre de usuario ya existe ");
            return {error: true, message: 'El nombre de usuario ya existe.'};
        }
        id = 1;
        if (this.users.length > 0)
            id = this.users[this.users.length - 1].id + 1;
        user = {id: id, name: name, password: password, isAdmin: isAdmin, question: '¿Respuesta? resp', answer: 'resp' };
        this.users.push(user);
        console.log(" usuario creado ");
        console.log(this.users);
        return {error: false, message: ''};
    }

    updateUser(idU, nameU, passwordU, isAdminU){
        search = this.users.filter(function(obj){
            return obj.name == nameU && obj.id != idU;
        }).map(function({id, name, password, isAdmin, question, answer}){
            return {id, name, password, isAdmin};
        });
        console.log(search);
        if(search.length > 0){
            return {error: true, message: "El usuario ya existe."};
        }
        user = this.users.filter(function(obj){
            return obj.id == idU;
        }).map(function({id, name, password, isAdmin, question, answer}){
            return {id, name, password, isAdmin};
        });
        if (user.length == 0){
            console.log("no se encontro.. "+ idU + 'id');
            return {error: true, message: "No se encontró el usuario, por favor intente nuevamente."};
        } else {
            this.users = this.users.map(item => {
                if(item.id === idU){
                  return { id: idU, name: nameU, password: passwordU, isAdmin: isAdminU, question: item.question, answer: item.answer  }
                }
                return item
            });
            return {error: false, message: ''};
        }
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
        return this.scenes.filter(function(obj){
            return obj.id == id;
        })[0];
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

    saveScene(scene){
        scenes = this.scenes.filter(function(obj){
            return obj.name == scene.name && obj.id != scene.id;
        }).map(function({id, name}){
            return {id, name};
        });
        if(scenes.length > 0){
            return { result: false, message: "Ya existe una escena con ese nombre."};
        }
        if(scene.id == 0){
            scene.id = this.scenes[this.scenes.length - 1].id + 1;
            this.scenes.push(scene);
        } else{
            this.scenes = this.scenes.map(item => {
                if(item.id === scene.id){
                  return scene
                }
                return item
            });
        }
        return { result: true, message: '' };
    }

    deleteScene(id){
        this.scenes = this.scenes.filter(function(obj){
            return obj.id != id;
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
