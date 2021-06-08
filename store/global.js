export const state = () => ({
    sidebar_temporary:true,
    drawer:false,
    login_popup:false,
    signup_popup:false,
    contact_popup:false,
    resps:[
        ],
    resp_total:0
})

export const mutations = {
    changeSidebarTemporary(state,sidebar_temporary){
        state.sidebar_temporary = sidebar_temporary       
    },
    changeDrawer(state,drawer){
        state.drawer = drawer       
    },
    contactPopup(state,show){
        state.contact_popup = show       
    },
    loginPopup(state,show){
        state.login_popup = show       
    },
    signupPopup(state,show){
        state.signup_popup = show       
    },
    changeRespAmount(state,parameter){
        state.resps[parameter.array_key]['amount']=parameter.amount
        var total_sum_val = 0
        state.resps.forEach(function (each_resp, index) {
            total_sum_val = parseInt(total_sum_val) + parseInt(each_resp.amount)
        });
        state.resp_total = total_sum_val
    },
}

export const getters = {
    getresps: (state) => {
      return state.resps
    }
  }