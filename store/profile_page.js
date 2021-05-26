export const state = () => ({
    userid:0,    
    background:'default_background.jpg',
    avatar:'beckham.jpg',
    fullname:'Denis Rodeman',
    username:'denisrodeman',
    title:"The world's famous basketball player",
    email:"denisrodman@gmail.com",
    phone:"+43 564 434 4345",
    location:"Las Vegas",
    featured_tags:["yellow","black","jacket","charming","great","sparkling","stared","top-star","interesting"],
})

export const mutations = {
    setUserData(user){
        state.userid = user.userid
        state.background = user.background
        state.avatar = user.avatar
        state.fullname = user.fullname
        state.username = user.username
        state.title = user.title
        state.featured_tags = user.featured_tags
    }
}