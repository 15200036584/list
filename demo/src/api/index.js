import request from '../utils/request';

const api ={
    submitFile:(filedata)=>request.post('/api/upload',filedata)
}
export default api;