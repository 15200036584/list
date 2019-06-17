<template>
  <div class="home">
   
    <Header/>
    <TableMenu @change="menuChange"/>
    <TableType @spanBtn="typeChange"/>
    <Todolist :options="listData"/>
    <div class="add_list" @click='show=true'>
      <i class="iconfont icon-jia"></i>
      <p>发起任务</p>
    </div>
    <PopUp :show="show" @close='show=false'/>
  </div>
</template>
<script>
import TableMenu from "./components/tableMenu";
import TableType from "./components/tableType";
import Todolist from "./components/todolist";
import PopUp from "../../components/popUp";
import request from "../../utils/request";
import Header from '../../components/header';
import {mapActions,mapMutations} from 'vuex';
export default {
  data() {
    return {
      // listData: null,
      // tableOptions: {
      //   status: 0,
      //   type: "overtime",
      //   create_at: 0,
      //   pageSize: 10,
      //   page: 1
      // }
      show:false
    }
    
  },
  components: {
    TableMenu,
    TableType,
    Todolist,
    PopUp,
    Header
  },
  created() {
    console.log('home');
    request.get('/api/user/info')
    this.getTaskList();
  },
  computed: {
        listData(){
            return this.$store.state.listData
        }
    },
  methods: {
    menuChange(index) {
      // this.tableOptions.status = index;
      // this.getTaskList();
      this.$store.commit('menuChange',index);
      this.getTaskList();
      
    },
  
    typeChange(index) {
      // this.tableOptions.type = index;
      // this.getTaskList();
      this.$store.commit('typeChange',index);
      this.getTaskList();
    },
    getTaskList(){
      this.$store.dispatch('getTaskList');
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../static/common";
@import "../../static/_minix";
.home {
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  color: #0b0b0a;
  .add_list {
    width: pxTorem(150px);
    height: pxTorem(50px);
    background: #086644;
    position: fixed;
    bottom: 3%;
    right: 5%;
    border-radius: pxTorem(30px);
    overflow: hidden;
    display: flex;
    padding: pxTorem(13px) pxTorem(25px);
    box-sizing: border-box;
    font-size: pxTorem(18px);
    // font-weight:900;
    color: #fff;
    .iconfont {
      font-size: pxTorem(23px);
      margin-right: pxTorem(3px);
      line-height: pxTorem(23px);
    }
  }
}
</style>