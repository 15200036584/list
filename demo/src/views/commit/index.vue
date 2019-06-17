<template>
  <div class="wrap">
    <header>
      <span style="font-weight:500" @click="$router.go(-1)">←</span>
      <span>{{title}}</span>
      <span></span>
    </header>
    <div class="commit_section">
      <div class="section_title">
        <dl>
          <dt>
            <img>
          </dt>
          <dd>
            <p>
              <span>申请人姓名</span>
              <b>{{userData.nickname}}</b>
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
            <span>
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            </span>
          </li>
          <li>
            <span>
              <b>加班类型</b>
            </span>
            <span>
              <select>
                <!-- <option value="-1">默认</option> -->
                <option v-for="item in this.overTimeType" :key="item.id">{{item.title}}</option>
              </select>
            </span>
          </li>
          <li>
            <span>
              <b>加班起始时间*</b>
            </span>
            <span>
              <el-date-picker
                v-model="startTime"
                type="datetime"
                @change=" endtimeSelect"
                placeholder="选择日期时间"
              ></el-date-picker>
            </span>
          </li>
          <li>
            <span>
              <b>加班截止时间</b>
            </span>
            <span>
              <el-date-picker
                v-model="endTime"
                type="datetime"
                @change=" endtimeSelect"
                placeholder="选择日期时间"
              ></el-date-picker>
            </span>
          </li>
          <li>
            <span>
              <b>共计时间</b>
            </span>
            <span>{{num}}</span>
          </li>
        </div>
        <div class="apple">
          <span>
            加班事由
            <b>*</b>
          </span>
          <li>
            <textarea class="textarea" v-model="textvalue"></textarea>
          </li>
        </div>
        <div class="foot">
          <span @click="$router.back()">取消</span>
          <span>提交</span>
        </div>
        <div class="uploading">
          <li>
            <input type="file" @change="submitFile">
            <b>+</b>
            <span>上传图片</span>
          </li>
          <div class="pics">
            <div v-for="(item,index) in this.imges" :key="index">
              <span @click="imges.splice(index,1)">X</span>
              <p>
                <img :src="'http://localhost:8080'+item" alt>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request";
import api from "../../api/index.js";
export default {
  props: {
    type: String
  },

  data() {
    return {
      value1: null,
      startTime: null,
      endTime: null,
      num: "",
      imges: [],
      textvalue: "",
      guide: {
        type: ["jpg", "gif", "svg", "png", "jpeg"],
        size: 3 //mb
      },
      overTimeType: [
        {
          id: 0,
          title: "双休日"
        },
        {
          id: 1,
          title: "节假日"
        },
        {
          id: 2,
          title: "工作日"
        }
      ],
      vacationType: [
        {
          id: 1,
          title: "年假"
        },
        {
          id: 2,
          title: "调休"
        }
      ]
    };
  },
  computed: {
    title() {
      return this.type === "overtime" ? "办公室加班申请表" : "办公室调休申请表";
    },
    userData() {
      return this.$store.state.userData;
    },
    names() {
      return (this.types = "overtime" ? "加班" : "休假");
    }
  },
  created() {
    let type = this.$route.params.type;
    this.types = type;
    let tokens = window.localStorage.getItem("token");
    request.get("/api/user/info");
    this.getUser(tokens);
  },
  methods: {
    getUser(tokens) {
      this.$store.dispatch("getUser", tokens);
    },
    endtimeSelect() {
      let sTime = new Date(this.startTime) * 1;
      let eTime = new Date(this.endTime) * 1;
      let num = eTime - sTime;
      let day = (num / 1000 / 60 / 60 / 24).toFixed(1);
      console.log(day);
      this.num = day;
    },
    submitFile(e) {
      let userfile = e.target.files[0]; //图片对象
      let { type, size } = userfile; //kb
      let fileType = type.match(/\/(\w+)$/i)[1];
      let error = "";
      if (!this.guide.type.includes(fileType)) {
        error = `请上传${this.guid.type.join()}类型的文件`;
      }
      if (this.guide.size * 1024 * 1024 < size) {
        error = `请上传小于${this.guide.type}MB大小的文件`;
      }
      if (error) {
        alert(erros);
        return;
      }
      //向服务器提交文件
      const fromdata = new FormData();
      console.log(fromdata);
      fromdata.append("file", userfile);
      request.post("/api/upload",fromdata).then(({ data }) => {
        // this.imges.push(data.url);
        console.log(data);
      });
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../../static/_minix";
@import "../../static/common";
.wrap {
  width: 100%;
  height: 100%;
  @include box_flex;
  @include direction(column);
  list-style: none;
}
header {
  width: 100%;
  height: pxTorem(40px);
  @include box_flex;
  @include align;
  @include sizing;
  padding: 0 pxTorem(10px);
  background: green;
  @include justify(space-between);
  span {
    color: #fff;
  }
  span:nth-child(1) {
    font-size: pxTorem(16px);
  }
}
.commit_section {
  width: 100%;
  flex: 1;
  overflow-y: scroll;
}
.section_title {
  width: 100%;
  height: pxTorem(100px);
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
        justify-content: space-between;
        padding: 0 pxTorem(10px);
        @include sizing;
        color: #fff;
        span {
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
    position: relative;
  }
  input {
    opacity: 0;
  }
  span {
    position: absolute;
    left: 40%;

    top: 0;
  }
  img {
    margin-left: pxTorem(10px);
    width: pxTorem(70px);
    height: pxTorem(70px);
  }
  b {
    font-size: pxTorem(30px);
    font-weight: 100;
    position: absolute;
    left: 10%;

    top: 0;
  }
}
.el-date-editor {
  width: 90%;
}
.textarea {
  width: 100%;
  height: 100%;
}
</style>
