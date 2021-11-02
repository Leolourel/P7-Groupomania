import { createStore } from "vuex";
//Import du package axios
const axios = require('axios');
 //Création d'une baseUrl axios pour les appels api
const instance = axios.create({
    baseURL: 'http://localhost:3000'
});

//On stock l'objet user dans le localStorage pour avoir accès à ses propriété
let user = localStorage.getItem('user');
if(!user) {
    user = {
        id: -1,
        token: '',
        isAdmin: 0,
        pseudo: "",
        email: "",
        avatar: ""
    };
}else {
    try{
        user = JSON.parse(user);
        instance.defaults.headers.common['Authorization'] = user.token;
    } catch (ex) { //Si l'user n'est pas défini on lui donne un id = -1 pour qu'il n'est pas accès à l'app sans connexion
        user = {
            id: -1,
            token:'',
        };
    }
}

//Création du store
const store = createStore({

    //Définition des états user et userInfos
    state: {
        status:'',
        //user est défini dans la fonction plus haut
        user: user,
        userInfos: {
            id: "",
            pseudo: "",
            email: "",
            avatar: "",
            isAdmin: 0

        },
    },
    mutations: {
        setStatus: function (state, status) {
            state.status = status;
        },
        //Lors de la connexion du user on défini son token et créer l'item user dans la localStorage, le statue est alors user
        logUser: function (state, user){
            instance.defaults.headers.common['Authorization'] = user.token;
            localStorage.setItem('user',JSON.stringify(user));
            state.user = user;
        },
        //Permet de basculer sur l'état userInfos
        userInfos: function (state, userInfos) {
            state.userInfos = userInfos;
        },
        //Lors de la déconnexion le localstorage est clear et l'user si il n'est pas connecter à un id = -1 qui empeche son accès à l'app
        logout: function (state){
            state.user = {
                id: -1,
                token:'',
            }
            localStorage.removeItem('user');
        }
    },
    actions: {
        //Fonction login
        login: ({commit}, userInfos) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                instance.post('/api/auth/login', userInfos)
                    .then(function (response) {
                        commit('setStatus', '');
                        commit('logUser', response.data)
                        resolve(response);
                    })
                    .catch(function (error) {
                        commit('setStatus', 'error_login');
                        reject(error);
                    });
            })
        },
        createAccount: ({commit}, userInfos) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                commit;
                instance.post('/api/auth/signup', userInfos)
                    .then(function (response) {
                        commit('setStatus', 'created');
                        resolve(response);
                    })
                    .catch(function (error) {
                        commit('setStatus', 'error_create');
                        reject(error);
                    });
            })
        },
        getUserInfos: ({commit}) => {
            instance.get('/api/auth/infos')
                .then(function (response) {
                    commit('userInfos', response.data);
                    console.log(response.data)
                })
                .catch(function () {
                });
        },
    }
});

export default store;
