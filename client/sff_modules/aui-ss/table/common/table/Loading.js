"";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={render:function anonymous(){with(this)return _c("div",{staticStyle:{width:"100%",height:"100%"}},[_c("div",{staticClass:"v-table-loading"}),_v(" "),_c("div",{staticClass:"v-table-loading-content",domProps:{innerHTML:_s(loadingContent)}})])},staticRenderFns:[],name:"loading",props:{loadingContent:[String],width:[Number,String],height:[Number,String]},methods:{setPosition:function(){var t=this.$el,e=this.$el.querySelector(".v-table-loading-content");e.style.top=t.clientHeight/2-e.clientHeight/2+"px"}},mounted:function(){var t=this;this.$nextTick(function(e){t.setPosition()})}};