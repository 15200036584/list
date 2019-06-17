<template>
    <div class="alertbox" v-show="open">
        {{text}}
    </div>
</template>

<script>
import { setTimeout, clearTimeout } from 'timers';
export default {
    props:{
        text:String
    },
    data(){
        return{
            open:false,
            timer:null
        }
    },
    mounted(){
        this.timer=setTimeout(()=>{
            this.show = false;
        },2000);
    },
    destroyed() {
        clearTimeout(this.timer);
    },
}
</script>

<style lang='scss' scoped>
@import '@static/scss/common.scss';
.alertbox{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    background: rgba($color: hsla(0, 0%, 0%, 0.637));
    color:#Fff;
    padding:pxTorem(20px);
    font-size:pxTorem(14px);
    z-index: 100;
}
</style>
