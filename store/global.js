export const state = () => ({
    sidebar_temporary:true,
    drawer:false,
    login_popup:false,
    signup_popup:false,
    resps:[
            {
                category:"survey",
                title:"Survey Property",
                additional:"if needed",
                done:false,
                range:"$1500 ~ $2500",
                amount:0
            },
            {
                category:"survey",
                title:"Plot Plan",
                additional:"required",
                done:false,
                range:"$100 ~ $500",
                amount:0
            },
            {
                category:"survey",
                title:"Stake for Digging Footers",
                additional:"required",
                done:false,
                range:"$100 ~ $350",
                amount:0
            },
            {
                category:"survey",
                title:"Pin for Block Points",
                additional:"required",
                done:false,
                range:"$100 ~ $350",
                amount:0
            },
            {
                category:"permits",
                title:"Building Permit",
                additional:"SC $2000 ~ $3000",
                done:false,
                range:"$1200 ~ $2000",
                amount:0
            },
            {
                category:"permits",
                title:"Waste System",
                additional:"",
                done:false,
                range:"$200 ~ $400",
                amount:0
            },
            {
                category:"permits",
                title:"Water",
                additional:"",
                done:false,
                range:"$250 application fee",
                amount:0
            },
            {
                category:"permits",
                title:"Zoning Permit",
                additional:"",
                done:false,
                range:"$250",
                amount:0
            },
            {
                category:"permits",
                title:"Impact Fees",
                additional:"if needed, call county",
                done:false,
                range:"$0 ~ $2500",
                amount:0
            },
            {
                category:"land",
                title:"Clearing",
                additional:"",
                done:false,
                range:"$5000 ~ $7000",
                amount:0
            },
            {
                category:"land",
                title:"Grading",
                additional:"",
                done:false,
                range:"$1000 ~ $5000",
                amount:0
            },
            {
                category:"land",
                title:"Culvert",
                additional:"",
                done:false,
                range:"$800 ~ $1200",
                amount:0
            },
            {
                category:"land",
                title:"Temporary Driveway",
                additional:"",
                done:false,
                range:"$1000 ~ $2000",
                amount:0
            },
            {
                category:"land",
                title:"Exterior Walks and Patios",
                additional:"",
                done:false,
                range:"",
                amount:0
            },
            {
                category:"land",
                title:"Permanent Driveway",
                additional:"",
                done:false,
                range:"",
                amount:0
            },
            {
                category:"land",
                title:"Landscaping",
                additional:"",
                done:false,
                range:"min $1000",
                amount:0
            },
            {
                category:"waste",
                title:"Septic Tank",
                additional:"",
                done:false,
                range:"$4000 ~ $9000",
                amount:0
            },
            {
                category:"waste",
                title:"Public Sewer System",
                additional:"call county",
                done:false,
                range:"$500 ~ $7000",
                amount:0
            },
            {
                category:"waste",
                title:"Waste Line",
                additional:"from home to sewer/septic",
                done:false,
                range:"avg $9 linear ft",
                amount:0
            },
            {
                category:"water",
                title:"Well",
                additional:"",
                done:false,
                range:"$7000 ~ $12000",
                amount:0
            },
            {
                category:"water",
                title:"Public Water",
                additional:"call county",
                done:false,
                range:"$1000 ~ $8000 tap fee",
                amount:0
            },
            {
                category:"water",
                title:"Water Line",
                additional:"from source to home",
                done:false,
                range:"avg $18 linear ft",
                amount:0
            },
            {
                category:"power",
                title:"Temporary Power",
                additional:"",
                done:false,
                range:"$250",
                amount:0
            },
            {
                category:"power",
                title:"Permanent Power",
                additional:"",
                done:false,
                range:"$200",
                amount:0
            },
            {
                category:"foundation",
                title:"Overheight Foundation",
                additional:"",
                done:false,
                range:"$4000 ~ $15000",
                amount:0
            },
            {
                category:"foundation",
                title:"Engineered Footings",
                additional:"",
                done:false,
                range:"$1000",
                amount:0
            },
            {
                category:"misc",
                title:"Builders Risk Insurance",
                additional:"",
                done:false,
                range:"$200 ~ $800",
                amount:0
            },
            {
                category:"misc",
                title:"Application and Installation",
                additional:"",
                done:false,
                range:"$0 ~ $5000",
                amount:0
            },
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