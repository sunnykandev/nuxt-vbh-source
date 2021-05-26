<template>
<v-col
sm="6"
md="4"
lg="3"
xl="3"
xxl="2"
>
    <v-card elevation="1">
        <div class="home_card_image_container">
            <v-btn
                elevation="0"
                style="position:absolute; z-index:1; right:0; top:7px;"
                class="mx-2"
                fab
                dark
                small
                color="#3333"
                @click="addFavorite(id)"
                >
                <v-icon 
                v-if="$store.state.localStorage.favorite_homes.includes(id)"
                dark>
                    mdi-heart
                </v-icon>
                <v-icon 
                v-else
                dark>
                    mdi-heart-outline
                </v-icon>
            </v-btn>
            
            <v-carousel
                show-arrows-on-hover
                hide-delimiter-background
                delimiter-icon="mdi-minus"
                hide-delimiters
                height="170"
                >
                <v-carousel-item
                v-for="(image,i) in images"
                :key="i"
                >
                    <v-img :src="image" height="200px" />
                </v-carousel-item>
            </v-carousel>
        </div>        
        
        <div class="home_card_content">
            <div class="home_card_title_partition">
                <div class="home_card_title">
                    {{title}}
                </div>
                <v-sheet class="home_card_subtitle">
                    <v-icon left >mdi-home-edit-outline</v-icon>
                    Additional Options
                    <v-chip
                    class="ma-2 bold"
                    small
                    >
                    {{option_count}}
                    </v-chip>
                </v-sheet>
            </div>
            <v-sheet class="home_card_info_partition">
                <v-sheet class="home_card_info_item">
                    <div class="home_card_info_item_title">
                        Lot Size
                    </div>
                    <div class="home_card_info_item_content">
                        <img src="https://preview.colorlib.com/theme/homes/img/rooms/size.png"/>
                        {{size}} sqft
                    </div>
                </v-sheet>
                <v-spacer></v-spacer>
                <v-sheet class="home_card_info_item">
                    <div class="home_card_info_item_title">
                        Beds
                    </div>
                    <div class="home_card_info_item_content">
                        <img src="https://preview.colorlib.com/theme/homes/img/rooms/bed.png"/>
                        {{beds}}
                    </div>
                </v-sheet>
                <v-spacer></v-spacer>
                <v-sheet class="home_card_info_item">
                    <div class="home_card_info_item_title">
                        Baths
                    </div>
                    <div class="home_card_info_item_content">
                        <img src="https://preview.colorlib.com/theme/homes/img/rooms/bath.png"/>
                        {{baths}}
                    </div>
                </v-sheet>
                <v-spacer></v-spacer>
                <v-sheet class="home_card_info_item">
                    <div class="home_card_info_item_title">
                        Garage
                    </div>
                    <div class="home_card_info_item_content">
                        <img src="https://preview.colorlib.com/theme/homes/img/rooms/garage.png"/>
                        {{garage}}
                    </div>
                </v-sheet>
            </v-sheet>

            <div class="home_card_action_partition">
                <div class="home_card_price_part">
                    <div class="home_card_price_info">
                        From
                    </div>
                    <div class="home_card_price">
                        ${{baseprice}}
                    </div>
                </div>
                <v-spacer></v-spacer>
                <div class="home_card_button_part">
                    <v-btn :loading="customize_loading" @click="customize_loading=true" :href="customize_href" outlined large color="dimgrey">
                        Customize
                    </v-btn>
                </div>
            </div>
        </div>        
    </v-card>
</v-col>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
    props:['title','images','option_count','size','beds','baths','garage','baseprice','id'],
    data(){
        return{
            customize_loading:false,
            customize_href:"",
        }
    },
    mounted(){
        this.setHref()
    },
    methods:{
        setHref(){
           this.customize_href = "/customize/"+ this.slugify(this.title)+"?id="+this.id
        },
        slugify(text) {
            const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;"
            const to = "aaaaaeeeeeiiiiooooouuuunc------"

            const newText = text.split('').map(
                (letter, i) => letter.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i)))

            return newText
                .toString()                     // Cast to string
                .toLowerCase()                  // Convert the string to lowercase letters
                .trim()                         // Remove whitespace from both sides of a string
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/&/g, '-y-')           // Replace & with 'and'
                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                .replace(/\-\-+/g, '-');        // Replace multiple - with single - 
        },
        ...mapMutations({
            addFavorite:'localStorage/addFavorite',
        })
    }
}
</script>
<style>
    .v-card{
        overflow: hidden;
    }
    .home_card_content{
        padding: 12px;
        overflow: hidden;
    }
    .home_card_title_partition{
        border-bottom: solid 1px #ddd;
    }
    .home_card_title{
        font-size: 18px;
        font-weight: 600;
        text-align: center;
    }
    .home_card_subtitle{
        font-size: 14px;
        color: dimgrey;
        padding: 6px 0px 0px;
    }
    .home_card_subtitle i{
        margin-right: 3px;
        margin-bottom: 5px;
    }
    .home_card_info_partition{
        border-bottom: solid 1px #ddd !important;
        display: flex;
        padding: 10px 0px;
    }
    .home_card_info_item{
        display: inline-block;
    }
    .home_card_info_item_title{
        font-size: 12px;
        color: dimgrey;
        padding: 3px 0px;
    }
    .home_card_info_item_content{
        float: left;
        font-size: 14px;
        display: flex;
        color: #0281ff;
    }
    .home_card_info_item_content img{
        margin-right: 7px;
    }
    .home_card_action_partition{
        padding: 8px 0px 0px;
        overflow: hidden;
        display: flex;
        align-items: center;
    }
    .home_card_price_part{
        float: left;
    }
    .home_card_price_info{
        font-size: 15px;
    }
    .home_card_price{
        font-size: 21px;
        font-weight: 600;
    }
    .home_card_button_part{
        float: right;
    }
    .home_card_button_part button:hover{
        background:#0281ff;
        border:none;
    }
    .home_card_button_part button:hover span{
        color: white;
    }
</style>
