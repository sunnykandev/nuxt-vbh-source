export const state = () => ({
    land_information:[],
    land_cost:0,
    resp_information:[],
    resp_cost:0,
    favorite_homes:[],
    customized_homes:[],
    last_customized_home:"",
    home_cost:0,
    lender_data:{},
    total_cost:0,
    favorite_homes:[],
    page_contents:[],
})

export const mutations = {
    savePageContents(state,info){
        state.page_contents = info
    },
    changeLandInformation(state,info){
        state.land_information = info
    },
    changeLandCost(state,cost){
        state.land_cost = cost
        state.total_cost = parseInt(state.land_cost)+parseInt(state.resp_cost)+parseInt(state.home_cost)
    },
    changeRespInformation(state,info){
        state.resp_information = info       
    },
    changeRespCost(state,cost){
        state.resp_cost = cost
        state.total_cost = parseInt(state.land_cost)+parseInt(state.resp_cost)+parseInt(state.home_cost)
    },
    saveCustomization(state,info){
        state.last_customized_home = info.id
        if(state.customized_homes.length){
            state.customized_homes.forEach((element,i) => {
                if(element.id==info.id){
                    state.customized_homes.splice(i,1)
                    state.customized_homes.push(info) 
                    console.log(info)
                    return false
                }else if(i==state.customized_homes.length-1){
                    state.customized_homes.push(info) 
                }
            });  
        }else{
            state.customized_homes.push(info)   
        }   
    },
    changeHomeCost(state,cost){
        state.last_customized_home=cost.id
        state.home_cost = cost.cost
        state.total_cost = parseInt(state.land_cost)+parseInt(state.resp_cost)+parseInt(state.home_cost)
    },
    saveLender(state, lender){
        state.lender_data = lender
    },
    addFavorite(state, id){
        if(state.favorite_homes.includes(id)){
            state.favorite_homes.splice(state.favorite_homes.indexOf(id),1) 
        }else{
            state.favorite_homes.push(id)
        }
    },
    loadAllData(state, data){
        console.log('loadAllData')
        if(!state.customized_homes.length){
            state.customized_homes = data.customizedHomes
            console.log('vuex load all data')
        }
        if(!state.favorite_homes.length){
            state.favorite_homes = data.favoriteHomes
            console.log('vuex load all data')
        }
        if(!state.land_information.length){
            state.land_information = data.landInfo
            console.log('vuex load all data')
        }
        if(!state.resp_information.length){
            state.resp_information = data.respInfo
            console.log('vuex load all data')
        }
        if(!state.home_cost){
            state.home_cost = data.homeCost
            console.log('vuex load all data')
        }
        if(!state.land_cost){
            state.home_cost = data.landCost
            console.log('vuex load all data')
        }
        if(!state.resp_cost){
            state.home_cost = data.respCost
            console.log('vuex load all data')
        }
        if(!state.total_cost){
            state.home_cost = data.totalCost
            console.log('vuex load all data')
        }
        if(!state.last_customized_home){
            state.last_customized_home = state.customized_homes[state.customized_homes.length-1].id
            console.log('vuex load all data')
        }
    }
}

export const actions = {
    async getUserData({commit}) {
        console.log('all data request')
        await this.$axios.get('/api/user/myallinfo')
        .then((res) => {
            if (res.status === 200) {
                commit('loadAllData', res.data.data)
            }
        })
        
    },
}