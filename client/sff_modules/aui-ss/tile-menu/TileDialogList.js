"";Object.defineProperty(exports,"__esModule",{value:!0});var _TileDialogItem=require("./TileDialogItem"),_TileDialogItem2=_interopRequireDefault(_TileDialogItem);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}exports.default={render:function anonymous(){with(this)return _c("div",{staticClass:"tile-dialog-list",style:{width:width,height:height}},_l(tileListData,function(e,t){return _c("tile-item",{key:t,attrs:{"img-src":e.icon,title:e.tradeName,"is-enabled":e.isEnabled},on:{itemClicked:function(t){onMenuItemClicked(tileColumnIndex,tileGroupIndex,e)}}})}))},staticRenderFns:[],name:"tile-dialog-list",props:{tileListData:Array,width:String,height:String,tileColumnIndex:Number,tileGroupIndex:Number},data:function(){return{}},components:{TileItem:_TileDialogItem2.default},methods:{onMenuItemClicked:function(e,t,i){this.$emit("itemClicked",[e,t,i])}}};