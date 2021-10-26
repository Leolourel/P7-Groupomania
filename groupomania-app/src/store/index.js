import { createStore } from "vuex"
const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000'
});


let user = localStorage.getItem('user');
if(!user) {
    user = {
        id: -1,
        token: '',
        isAdmin: 0
    };
}else {
    try{
        user = JSON.parse(user);
        instance.defaults.headers.common['Authorization'] = user.token;
    } catch (ex) {
        user = {
            userId: -1,
            token:'',
        };
    }

}

const store = createStore({

    state: {
        status:'',
        user: user,
        userInfos: {
            id: "",
            pseudo: "",
            email: "",
            avatar: "",
            isAdmin: 0

        },
        // gifs: [{
        //     id: 1,
        //     title: 'test',
        //     url:'test,'
        // }]
    },
    // getters: {
    //     getGifs(state) {
    //         return state.gifs;
    //     }
    // },
    // methods: {
    //   updateGif(){
    //       instance.get('/api/gif/')
    //           .then( reponse => this.gifs = reponse.data)
    //   }
    // },
    mutations: {
        setStatus: function (state, status) {
            state.status = status;
        },
        logUser: function (state, user){
            instance.defaults.headers.common['Authorization'] = user.token;
            localStorage.setItem('user',JSON.stringify(user));
            state.user = user;
        },
        userInfos: function (state, userInfos) {
            state.userInfos = userInfos;
        },
        logout: function (state){
            state.user = {
                userId: -1,
                token:'',
            }
            localStorage.removeItem('user');
        }
    },
    actions: {
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
        // getAllGif: ({commit}) => {
        //     instance.get('/api/gif/')
        //         .then(function (response ) {
        //             commit('gifs', response.data);
        //             console.log(response.data)
        //         })
        //         .catch(function () {
        //         })
        // },
    }
});

export default store;
