

export default ({app:{$axios}}, inject)=>{
    const utility = {
        name:'utility',
        async uploadImage(base64Data,name,new_name=true){
            let res = await $axios.post('/api/assets/upload_image',{base64data:base64Data, name:name,new_name:new_name})
            console.log(res.data.data)
            return res.data.data
        },
        async uploadFile(formData,name,new_name=true){
            let res = await $axios.post('/api/assets/upload_file',formData)
            console.log(res.data.data)
            return res.data.data
        }
    }
    inject('utility', utility)
}