"";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={render:function anonymous(){with(this)return _c("div",{staticClass:"tile-block",style:{"background-color":themeColor,filter:enabledColor},on:{click:clickItem}},[_c("img",{staticClass:"tile-block-icon",attrs:{src:tileBlockData.icon,alt:""}}),_v(" "),_c("span",{staticClass:"tile-block-title"},[_v(_s(tileBlockData.tradeName))])])},staticRenderFns:[],name:"tile-block",props:{tileBlockData:Object,themeColor:String,tileColumnIndex:Number,tileGroupIndex:Number},data:function(){return{enabledColor:""}},mounted:function(){this.tileBlockData.isEnabled?this.enabledColor="":this.enabledColor="grayscale(1)"},methods:{clickItem:function(){this.$emit("itemClicked",[this.tileColumnIndex,this.tileGroupIndex,this.tileBlockData])}}};