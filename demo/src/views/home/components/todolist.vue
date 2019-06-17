<template>
  <ul class="content">
    <li v-for=" item in options " :key="item.applicationNumber"
      @click="$router.push({
         name:'detail',
         params:{
           type:item.list_type,
           id:item.applicationNumber
         }
      })"
    >
      <!-- {{item}} -->
      <p>
        <span>{{item.applicationNumber}}</span>
        <span>
          <i class="iconfont icon-73dengdai"></i>待审批
        </span>
      </p>
      <div class="inner_list">
        <dl>
          <dt>申请人</dt>
          <dd>{{item.nickname}}</dd>
        </dl>
        <dl>
          <dt>加班类型</dt>
          <dd>{{showType(item.type,item.list_type)}}</dd>
        </dl>
        <dl>
          <dt>加班日期</dt>
          <dd>{{new Date(item.startTime).toLocaleDateString()}}</dd>
        </dl>
        <dl>
          <dt>加班时数</dt>
          <dd>{{reducetime(item.startTime,item.endTime)}}</dd>
        </dl>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["options"],
  methods: {
    showType(type, title) {
      if (title === "overtime") {
        switch (type) {
          case 1:
            return "双休日加班";
          case 2:
            return "节假日加班";
          case 3:
            return "工作日加班";
              default:
                return "加班"
        }
      }else{
        switch (type) {
          case 1:
              return '年假'
          case 2:
              return '调休'
              case 3:
                return '休假'
        }
      }
    },
    reducetime(start,end){
       
      let start_num = new Date(new Date(start).toGMTString())*1;
      let end_num = new Date(new Date(end).toGMTString())*1;
      let num =  end_num -start_num;
      let day = (num/1000/60/60/24).toFixed(1);
   
       return day;
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../../../static/_minix";
@import "../../../static/common";
.content {
  flex: 1;
  overflow-y: auto;
  li {
    width: 100%;
    height: pxTorem(110px);
    overflow: hidden;
    background: #fff;
    display: flex;
    flex-direction: column;
    margin-top: pxTorem(10px);
    padding: pxTorem(10px) pxTorem(15px);
    box-sizing: border-box;
    p:nth-child(1) {
      width: 100%;
      height: pxTorem(30px);
      display: flex;
      justify-content: space-between;
      color: #969696;
      span {
        i {
          font-size: pxTorem(20px);
          margin-right: pxTorem(5px);
          color: #f7d536;
        }
      }
    }

    .inner_list {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      dl {
        width: 45%;
        display: flex;

        font-size: pxTorem(14px);
        line-height: pxTorem(30px);

        dt {
          width: 40%;
          color: #969696;
        }
        dd {
          margin-left: pxTorem(15px);
        }
      }
    }
  }
}
</style>
