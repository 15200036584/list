<template>
        <div class="container_btn">
      <p></p>
      <p class="btn_inner">
        <!-- <span class="active">加班</span>
        <span>休假</span> -->
          <span  :class="{active:item.idx===index}"
          @click="spanBtn(item.idx)"
          v-for="item in spanList" :key='item.idx' >{{item.name}}</span>
      </p>
      <p>
        <i class="iconfont icon-iconplsd"></i>
        <i class="iconfont icon-paixu-sheng"></i>
      </p>
    </div>

</template>

<script>
export default {
  data(){
    return{
        index:'overtime',
        spanList:[
          {
            idx:'overtime',
            name:'加班'
          },{
            idx:"vacation",
            name:'休假'
          }
        ]
    }
  },
  methods:{
     spanBtn(index){
       this.index = index;
       this.$emit('spanBtn',index);
     }
  }
}
</script>

<style lang='scss' scoped>
@import "../../../static/_minix";
@import "../../../static/common";
  .container_btn {
    width: 100%;
    height: pxTorem(60px);
    margin-top: pxTorem(8px);
    display: flex;
    justify-content: space-between;
    padding: pxTorem(15px);
    box-sizing: border-box;
    p {
      width: 20%;
      text-align: center;
    }
    p:nth-child(3) {
      display: flex;
      line-height: pxTorem(30px);
      color: #cbc9c9;
      font-weight: 900;
      i {
        margin: 0 pxTorem(8px);
      }
      i:nth-child(1) {
        font-size: pxTorem(22px);
      }
      margin-left: pxTorem(5px);
    }
    .btn_inner {
      flex: 1;
      display: flex;
      border-radius: pxTorem(17px);
      overflow: hidden;
      line-height: pxTorem(30px);
      border: pxTorem(0.5px) solid #0c6142;

      span {
        flex: 1;
        color: #0c6142;

        &.active {
          color: #fff;
          background: #0c6142;
        }
      }
    }
  }

</style>
