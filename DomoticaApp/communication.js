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

    _userID = 0;
    _url = 'http://192.168.1.5:8000/';
    _IP = "192.168.1.5";
    _role = "";
    

    static getInstance() {
        if (Communication.myInstance == null) {
            Communication.myInstance = new Communication();
        }

        return Communication.myInstance;
    }

    setId(id){
        this._userID = id;
    }

    setIP(ip){
        this._IP = ip;
        this._url = 'http://' + ip + ':8000/';
    }

    getIP(ip){
        return this._IP;
    }

   /* _getUserId(){
        const idToken = AsyncStorage.getItem('idToken');
        return idToken ? parseInt(idToken,10): 0
    };*/

    async authenticate(user, password){
        url = this._url + 'login';
        try {
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user,
                    password: password,
                })
            });
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            return { result: false, message: 'Se produjo un error, reintente por favor.'};
        }

    }

    async isAdmin(){
        if(this._userID == 0)
            return { result: false, message: 'Se produjo un error, reintente por favor.'};
        url = this._url + 'users/' + this._userID + '/';
        try {
            let response = await fetch(url);
            let user = await response.json();
            message = user.isAdmin ? 'Correcto' : 'No tiene permiso de administrador';
            return { result: user.isAdmin, message: message };
        } catch (error) {
            return { result: false, message: 'Se produjo un error, reintente por favor.'};
        }
    }

    async getSecretQuestion(user){
        url = this._url + 'userQuestion';
        try {
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user,
                })
            });
            let responseJson = await response.json();
            return responseJson
        } catch (error) {
            return { result: false, message: 'Se produjo un error, reintente por favor.'};
        }
    }

    async validateSecretAnswer(user, answer){
        url = this._url + 'checkAnswer';
        try {
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user,
                    answer: answer
                })
            });
            let responseJson = await response.json();
            return responseJson
        } catch (error) {
            return { result: false, message: 'Se produjo un error, reintente por favor.'};
        }
    }

    async getZones(){
        url = this._url + 'zones/';
        try {
            let response = await fetch(url);
            let responseJson = await response.json();
            zones = responseJson.results
            console.log(zones);
            return zones;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getZone(id){
        url = this._url + 'zones/' + id + "/";
        try {
            let response = await fetch(url);
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getScenes(onDemand = true, timeCondition = true){
        url = this._url + 'scenes/';
        scenes = [];
        try {
            let response = await fetch(url);
            let responseJson = await response.json();
            return responseJson.results;
        } catch (error) {
            console.error(error);
            return scenes;
        }
    }

    async getUsers(){
        url = this._url + 'users/';
        try {
            let response = await fetch(url);
            let responseJson = await response.json();
            users = responseJson.results
            console.log("userID: " + this._userID);
            result = users.map(function(obj){
                return {id: obj.id, name: obj.name};
            });            
            return result;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getUser(id){
        url = this._url + 'users/' + id + '/';
        user = null;
        try {
            let response = await fetch(url);
            let user = await response.json();
            return {id: user.id, name: user.name, password: user.password, isAdmin: user.isAdmin}
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createUser(name, password, isAdmin){
        url = this._url + 'createUser';
        try {
            user = { name: name, password: password, isAdmin: isAdmin };
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user,
                    admin: this._userID 
                })
            });
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
            return { result: false, message: 'Se produjo un error, reintente por favor.' };
        }
    }

    async updateUser(id, name, password, isAdmin){
        url = this._url + 'users/' + id + '/';
        user = {id: id, name: name, password: password, isAdmin: isAdmin};
        try {
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": id,
                    "name": name,
                    "old_password": '',
                    "password": password,
                    "old_password": "",
                    "isAdmin": isAdmin,
                    "user": this._userID
                }),
            });
            let responseJson = await response.json();
            if(response.ok) {
                console.log("------------------------ updated ------------------------")
                return { result: true, message: "Se actualizó correctamente." };
            }
            if(response.status >= 500){
                return { result: false, message: "Se produjo un error, intente nuevamente." }; //throw new Error('Network response was not ok.');
            } else {
                return responseJson;
            }
        } catch (error) {
            return { result: false, message: "Hubo un error, intente nuevamente." };
        }
    }

    // falta probarlo desde aca
    async deleteUser(id){
        url = this._url + 'deleteUser';
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user": this._userID,
                "id": id
            }),
        });
        let responseJson = await response.json();
        if(response.result) {
            return { result: true, message: "Se actualizó correctamente." };
        }
    }

    async getScene(id){

        url = this._url + 'scenes/' + id + '/';
        scenes = null;
        try {
            let response = await fetch(url);
            let scene = await response.json();
            return scene;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getArtifacts(zoneId){
        url = this._url + 'zones/' + zoneId + '/artifact_list/';
        artifacts = [];
        try {
            let response = await fetch(url);
            let responseJson = await response.json();
            artifacts = responseJson
            console.log(artifacts);
            return artifacts;
        } catch (error) {
            console.error(error);
            return { result: false, message: 'Se produjo un error, intente nuevamente.' };
        }
    }

    getArtifact(id){
        result = this.artifacts.filter(function(obj){
            return obj.id == id;
        }).map(function({id, name, zoneId, on, type}){
            return {id, name, zoneId, on, type};
        });
        return result[0];
    }
    
    /*getVariables(artifactId){
        console.log("getVariables: " + artifactId);
        return this.variables.filter(function(obj){
            return obj.artifactId == artifactId;
        }).map(function({id, name, artifactId, value, type, min, max, minIcon, maxIcon}){
            return {id, name, artifactId, value, type, min, max, minIcon, maxIcon};
        })

    }*/

    getVariable(id){
        result = this.variables.filter(function(obj){
            return obj.id == id;
        }).map(function({id, name, artifactId, value, type, min, max, minIcon, maxIcon}){
            return {id, name, artifactId, value, type, min, max, minIcon, maxIcon};
        });
        return result[0];
    }

    async saveScene(scene){
        if(scene.id){
            url = this._url + 'scenes/'+scene.id+'/';
            try {
                let response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "id": scene.id,
                        "name": scene.name,
                        "description": scene.description,
                        "on_demand": scene.onDemand,
                        "time_condition": scene.timeCondition,
                        "time": scene.time,
                        "days": scene.days,
                        "actions": scene.actions
                    })
                });
                let responseJson = await response.json();
                return responseJson;
            } catch (error) {
                console.error(error);
                return { result: false, message: 'Se produjo un error, reintente por favor.' };
            }
        }else{
            url = this._url + 'scenes/';
            try {
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "name": scene.name,
                        "description": scene.description,
                        "on_demand": scene.onDemand,
                        "time_condition": scene.timeCondition,
                        "time": scene.time,
                        "days": scene.days,
                        "actions": scene.actions
                    })
                });
                let responseJson = await response.json();
                return responseJson;
            } catch (error) {
                console.error(error);
                return { result: false, message: 'Se produjo un error, reintente por favor.' };
            }
        }
/*
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
        return { result: true, message: '' };*/
    }

    deleteScene(id){
        this.scenes = this.scenes.filter(function(obj){
            return obj.id != id;
        });
    }

    /*getRanges(id){
        return this.var_ranges.filter(function(obj){
            return obj.variableId == id;
        }).map(function({id, name, variableId, type}){
            return {id, name, variableId, type};
        });
    }*/
    
    /*
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
        return false;
}*/

    async executeScene(id){
        url = this._url + 'executeScene';
        try{
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "scene": id
                }),
            });
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
            return { result: false, message: 'Se produjo un error, intente nuevamente.' };
        }
    }

    async turnOnOff(id, on){
        url = this._url + 'changePower';
        try {
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "artifact": id,
                    "power": on
                }),
            });
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error); 
            return { result: false, message: 'Se produjo un error, intente nuevamente.' };
        }
    }
    
    
    async changeVariable(id, value){
        url = this._url + 'changeVariable';
        try {
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "variable": id,
                    "value": value
                }),
            });
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
            return { result: false, message: 'Se produjo un error, intente nuevamente.' };
        }
    }
};
