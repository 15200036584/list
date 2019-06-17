import alertConfig from '../components/alertMessage';

export default {
    install(Vue){
        const AlertClass = Vue.extend(alertConfig);
        Vue.prototype.$alert = (text)=>{
            const AlertComponent = new AlertClass({
                propsData:{
                    text
                }
            });
            AlertComponent.$mount();
            document.body.appendChild(AlertComponent.$el);
        }
    }
}