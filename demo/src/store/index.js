import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import request from '../utils/request';
Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        userinfo:{},
        listData: null,
        token:"",
        userData:'',
        tableOptions: {
            status: 0,
            type: "overtime",
            create_at: 0,
            pageSize: 10,
            page: 1
        }
    },
    mutations: {
        menuChange(state,index){
            state.tableOptions.status = index;
            state.tableOptions.type = 'overtime';
        },
        typeChange(state,index){
            state.tableOptions.type = index;
        },
         
    },
    actions: {
        getTaskList({ state }) {
            request
                .get("/api/task/list", {
                    ...state.tableOptions
                })
                .then(res => {
                    state.listData = res.data;

                })
                .catch(res => {
                    console.log(res);
                });
        },
        getUser({state},tokens){
            request.get('/api/user/info',{
               ...state.token=tokens
            }).then(({data})=>{
            //    console.log(data);
               state.userData= data;
               
            })
        }
             
    }
});
export default store;