<template>
  <div class="detail">
    <div class="detail_header">
      <span>
        <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
      </span>
      <span style="font-weight:300">{{title}}</span>
      <span visibility="hidden"></span>
    </div>
    <div class="detail_section">
      <div class="section_title">
        <dl>
          <dt>
            <img :src="this.list.avatar" alt>
          </dt>
          <dd>
            <p>
              <span>申请人姓名</span>
              <b>{{this.list.nickname}}</b>
              <span style="font-family:'楷体'">></span>
            </p>
            <p>
              <span>直接主管</span>
              <b>秦怡超</b>
              <span></span>
            </p>
          </dd>
        </dl>
      </div>
      <div class="apped">
        <div class="application">
          <li>
            <span>
              <h2>申请信息</h2>
            </span>
            <span></span>
          </li>
          <li>
            <span>
              <b>加班日期*</b>
            </span>
            <span>{{new Date(this.list.startTime).toLocaleDateString()}}</span>
          </li>
          <li>
            <span>
              <b>加班类型</b>
            </span>
            <span>{{showType(this.list.type,this.list.list_type)}}</span>
          </li>
          <li>
            <span>
              <b>加班起始时间*</b>
            </span>
            <span>{{StartTime(this.list.startTime)}}</span>
          </li>
          <li>
            <span>
              <b>加班截止时间</b>
            </span>
            <span>{{new Date(this.list.endTime).toLocaleString()}}</span>
          </li>
          <li>
            <span>
              <b>共计时间</b>
            </span>
            <span>{{reducetime(this.list.startTime,this.list.endTime)}}</span>
          </li>
        </div>
        <div class="apple">
          <span>
            加班事由
            <b>*</b>
          </span>
          <li>{{this.list.describes}}</li>
        </div>
        <div class="foot">
          <span>取消</span>
          <span>提交</span>
        </div>
        <div class="uploading">
          <li>上传附件</li>
          <img :src="this.list.avatar">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request";
export default {
  props: {
    type: String,
    id: String
  },
  computed: {
    title() {
      return this.type === "overtime" ? "办公室加班申请表" : "办公室调休申请表";
    }
  },
  data() {
    return {
      list: {}
    };
  },
  created() {
    this.type = this.$route.params.type;
    this.id = this.$route.params.id;
    // console.log(this.type,this.id);

    request
      .get("/api/apply/" + this.type, {
        applicationNumber: this.id
      })
      .then(res => {
        this.list = res.data;
        console.log(this.list);
      });
  },
  methods: {
    showType(type, title) {
      if (title === "overtime") {
        switch (type) {
          case 1:
            return "双休日加班";
          case 2:
            return "节假日加班";
          case 3:
            return "节假日调休";
          default:
            return;
        }
      } else {
        switch (type) {
          case 1:
            return "年假";
          case 2:
            return "调休";
          default:
            return;
        }
      }
    },
    StartTime(start){
      console.log(start);
      if(start){
        return new Date(start).toLocaleString();
      }else{
        return null;
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
@import "../../static/_minix";
@import "../../static/common";
.detail {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  list-style: none;
  .detail_header {
    width: 100%;
    height: pxTorem(50px);
    @include box_flex;
    @include align;
    @include justify(space-between);
    padding: 0 pxTorem(10px);
    @include sizing;
    background: green;
    span {
      color: #fff;
      font-size: pxTorem(16px);
    }
  }
}
.detail_section {
  width: 100%;
  flex: 1;
  overflow-y: scroll;
  .section_title {
    width: 100%;
    height: pxTorem(90px);
    @include box_flex;
    background: green;
    padding: 0 pxTorem(10px);
    @include sizing;
    dl {
      width: 100%;
      display: flex;
      padding: 0 pxTorem(10px);
      @include sizing;
      margin-top: pxTorem(15px);
      dt {
        flex: 1;
        img {
          width: pxTorem(35px);
          height: pxTorem(35px);
          vertical-align: middle;
          border-radius: 50%;
        }
      }
      dd {
        flex: 9;

        p {
          width: 100%;
          line-height: 1.5;
          display: flex;
          justify-content: space-around;
          padding: 0 pxTorem(10px);
          @include sizing;
          color: #fff;
          span {
          }
        }
      }
    }
  }
}
.apped {
  width: 100%;
}
.application {
  margin: pxTorem(20px);
  width: 90%;
  border-radius: pxTorem(10px);
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: #ccc pxTorem(-2px) pxTorem(-2px) pxTorem(10px) pxTorem(10px);
  li {
    flex: 1;
    height: pxTorem(60px);
    line-height: pxTorem(60px);
    display: flex;
    span {
      flex: 1;
      text-align: center;
      h2 {
        font-size: pxTorem(18px);
      }
      b {
        color: #ccc;
      }
    }
  }
}
.apple {
  margin: pxTorem(20px);
  width: 90%;
  height: pxTorem(120px);
  display: flex;
  border-radius: pxTorem(10px);
  flex-direction: column;
  background: white;
  box-shadow: #ccc pxTorem(-2px) pxTorem(-2px) pxTorem(10px) pxTorem(10px);
  span {
    width: 100%;
    height: pxTorem(40px);
    border-bottom: 1px solid #ccc;
    line-height: pxTorem(40px);
    font-size: pxTorem(20px);
    padding-left: pxTorem(10px);
    b {
      color: red;
    }
  }
  li {
    padding-left: pxTorem(10px);
    flex: 1;
  }
}
.foot {
  width: 100%;
  height: pxTorem(50px);
  line-height: pxTorem(50px);
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  span:nth-child(1) {
    background: white;
    width: 20%;
    height: pxTorem(50px);
    text-align: center;
  }
  span:nth-child(2) {
    height: pxTorem(50px);
    background: green;
    color: white;
    flex: 1;
    text-align: center;
  }
}
.uploading {
  margin: pxTorem(20px);
  width: 90%;
  height: pxTorem(150px);
  display: flex;
  border-radius: pxTorem(10px);
  flex-direction: column;
  background: white;
  box-shadow: #ccc pxTorem(-2px) pxTorem(-2px) pxTorem(10px) pxTorem(10px);
  li {
    width: 100%;
    height: pxTorem(50px);
    line-height: pxTorem(50px);
    font-size: pxTorem(18px);
    padding-left: pxTorem(10px);
  }
  img {
    margin-left: pxTorem(10px);
    width: pxTorem(70px);
    height: pxTorem(70px);
  }
}
</style>
