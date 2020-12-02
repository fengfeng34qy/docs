"";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={render:function anonymous(){with(this)return _c("div",{staticClass:"aui-currency-input",class:[{"aui-currency-input-focus":isFocus},{"aui-currency-input-disabled":disabled},sizeClass]},[_t("prepend"),_v(" "),_c("input",{class:alignClass,attrs:{type:"text",placeholder:placeholder,disabled:disabled,maxlength:maxlengthUpdate,decimal:decimal,max:max,min:min,leadingZero:leadingZero,currencySymbol:currencySymbolUpdate,currencySymbolPlacement:currencySymbolPlacement,digitalGroupSpacing:digitalGroupSpacing,isNumeric:isNumeric,emptyInputBehavior:emptyInputBehavior,digitalGroupSpacingSymbol:digitalGroupSpacingSymbol,integerMaxLength:integerMaxLength,onpaste:"return false",oncontextmenu:"return false",oncopy:"return false",oncut:"return false"},domProps:{value:valueUpdate},on:{input:handleInput,blur:blur,focus:focus,textInput:handleTextInput,change:handleChange}})],2)},staticRenderFns:[],name:"aui-currency-input",props:{value:{type:[Number,String],required:!1},placeholder:{type:String,required:!1},disabled:{type:Boolean,default:!1},size:{type:String,default:"normal"},align:{type:String,default:"left"},maxlength:{type:[Number,String],required:!1},decimal:{type:[Number,String],default:0,required:!1},max:{type:[Number,String],default:Number.MAX_SAFE_INTEGER||9007199254740991,required:!1},leadingZero:{type:String,default:"deny",required:!1},min:{type:Number,default:Number.MIN_SAFE_INTEGER||-9007199254740991,required:!1},currencySymbol:{type:String,default:""},currencySymbolPlacement:{type:String,default:"p"},digitalGroupSpacing:{type:[String,Number],default:3},emptyInputBehavior:{type:String,default:"null"},isNumeric:{type:Boolean,default:!1},digitalGroupSpacingSymbol:{type:String,default:","},integerMaxLength:{type:[String,Number],required:!1}},data:function(){return{valueUpdate:void 0,currentElement:void 0,currencySymbolUpdate:"",maxlengthUpdate:void 0,isChange:!1,isFocus:!1}},computed:{sizeClass:function(){return"aui-currency-input-"+this.size},alignClass:function(){return"aui-currency-input-"+this.align},className:function(){return"aui-currency-input-"+this.size+" aui-currency-input-"+this.align}},watch:{valueUpdate:function(e){if(this.currentElement==document.activeElement){if(!this.maxlength)return void(this.maxlengthUpdate=1e3);this.maxlengthUpdate=this.maxlengthActual(e)}},value:function(e){this.currentElement!==document.activeElement?(null!==e&&void 0!==e||(e=""),this.valueUpdate=this.toRound(e),0===this.valueUpdate&&(this.valueUpdate=this.zeroFilling(this.valueUpdate)),this.currencySymbolUpdate&&(this.valueUpdate=this.toSymbol(this.valueUpdate)),this.digitalGroupSpacing&&this.valueUpdate&&(this.valueUpdate=this.formatInit(this.valueUpdate))):this.isChange||(this.valueUpdate=this.toRound(e),0===this.valueUpdate&&(this.valueUpdate=this.zeroFilling(this.valueUpdate)),this.currencySymbolUpdate&&(this.valueUpdate=this.toSymbol(this.valueUpdate)),this.digitalGroupSpacing&&this.valueUpdate&&(this.valueUpdate=this.formatInit(this.valueUpdate)))}},mounted:function(){if(this.currencySymbol){var e=this.currencySymbol.normalize("NFD");this.currencySymbolUpdate=e.replace(/\s*/,"")}if(this.maxlength&&(this.maxlengthUpdate=this.maxlengthActual(this.value)),this.integerMaxLength&&this.value){var t=this.value+"",i=t.length;if(-1!=t.indexOf(".")&&(i=t.split(".")[0].length),i>this.integerMaxLength)throw new Error("初始值整数部分长度超过规定整数部分的最大长度")}var a=this;(this.currentElement=this.$el.querySelector("input"),this.currentElement.onkeydown=function(e){var t=e||window.event||arguments.callee.caller.arguments[0],i=e.target.value,r=new RegExp(a.digitalGroupSpacingSymbol,"g");if(t&&t.key>="0"&&t.key<="9"||"Backspace"==t.key||"."==t.key||"ArrowLeft"==t.key||"ArrowRight"==t.key){("."==t.key&&-1!=i.indexOf(".")||""==i)&&"."==t.key&&t.preventDefault(),a.currencySymbol&&1==e.target.selectionStart&&"."==t.key&&t.preventDefault(),0==a.decimal&&"."==t.key&&t.preventDefault(),"Backspace"==t.key&&Object.defineProperty(t,"key",{value:""});var n=i.split("");if(""!=t.key&&"ArrowLeft"!=t.key&&"ArrowRight"!=t.key&&n.splice(t.target.selectionStart,t.target.selectionEnd-t.target.selectionStart,t.key),n=n.join(""),""==t.key&&((n=i.split("")).splice(t.target.selectionStart-1,1),n=n.join("")),i=i.replace(r,""),n=n.replace(r,""),a.integerMaxLength){var l=n.replace(r,"");a.currencySymbol&&(l=l.replace(a.currencySymbolUpdate,""));var u=l.length;-1!=l.indexOf(".")&&(u=l.split(".")[0].length),u>a.integerMaxLength&&t.key>="0"&&t.key<="9"&&t.preventDefault()}if(a.currencySymbol&&(i[0]==a.currencySymbolUpdate&&1==t.target.selectionStart&&""==t.key&&t.preventDefault(),0==t.target.selectionStart&&"ArrowLeft"!=t.key&&"ArrowRight"!=t.key&&t.preventDefault()),-1!=n.indexOf(".")){var s=n.split(".")[1];s||(s=""),s&&s.length>a.decimal&&""!=t.key&&"ArrowLeft"!=t.key&&"ArrowRight"!=t.key&&t.preventDefault()}if(a.currencySymbol)n.replace(a.currencySymbolUpdate,"")>a.max&&""!=t.key&&"ArrowLeft"!=t.key&&"ArrowRight"!=t.key&&"."!=t.key&&t.preventDefault();else n>a.max&&""!=t.key&&"ArrowLeft"!=t.key&&"ArrowRight"!=t.key&&"."!=t.key&&t.preventDefault();if(t.target.selectionStart!=t.target.selectionEnd&&""==t.key&&t.preventDefault(),"allow"!=a.leadingZero)if(a.currencySymbol){var c=i.replace(a.currencySymbolUpdate,""),o=n.replace(a.currencySymbolUpdate,"");"0"==c&&"0"==t.key&&"0"==t.key&&t.preventDefault(),"0"!=o&&1==t.target.selectionStart&&"."!=c[0]&&"0"==t.key&&t.preventDefault(),c.startsWith("0.")&&(1!=t.target.selectionStart&&2!=t.target.selectionStart||(2==t.target.selectionStart&&t.key>="0"&&t.key<="9"&&t.preventDefault(),"0"==t.key&&t.preventDefault()))}else"0"==i&&"0"==t.key&&"0"==t.key&&t.preventDefault(),"0"!=n&&0==t.target.selectionStart&&"."!=i[0]&&"0"==t.key&&t.preventDefault(),i.startsWith("0.")&&(0!=t.target.selectionStart&&1!=t.target.selectionStart||(1==t.target.selectionStart&&t.key>="0"&&t.key<="9"&&t.preventDefault(),"0"==t.key&&t.preventDefault()))}else t.preventDefault()},this.value)?(this.valueUpdate=this.toRound(this.value),(""+this.valueUpdate).length>this.maxlength&&console.warn("初始值长度超过字符最大长度"),this.currencySymbolUpdate&&(this.valueUpdate=this.toSymbol(this.valueUpdate)),this.digitalGroupSpacing&&this.valueUpdate&&(this.valueUpdate=this.formatInit(this.valueUpdate))):this.currencySymbol?this.valueUpdate=this.currencySymbolUpdate:(null!==this.value&&void 0!==this.value||(this.valueUpdate=""),0!==this.value&&""!==this.value||(this.valueUpdate=this.value))},methods:{toSymbol:function(e){return"p"==this.currencySymbolPlacement?this.currencySymbolUpdate+e:"s"==this.currencySymbolPlacement?e+this.currencySymbolUpdate:void 0},toRound:function(e){if(!e)return e;this.decimal;var t=0;if(-1!=(e+="").indexOf(".")){var i=e.split(".")[1];t=i?i.length:0}if(this.decimal>0){if(t>this.decimal)return(e=parseFloat(e)).toFixed(this.decimal)+"";var a=this.zeroFilling(e);return a||e}return t>0?Math.round(e):e},zeroFilling:function(e){if(e+="",this.decimal>0){if(-1==e.indexOf("."))return e=e+"."+"0".repeat(this.decimal);var t=e.split(".")[1].length;if(t<this.decimal){var i=this.decimal-t;return e+="0".repeat(i)}}},focus:function(e){this.isFocus=!0,this.$emit("focus")},blur:function(e){var t=e.target.value,i=new RegExp(this.digitalGroupSpacingSymbol,"g"),a=void 0,r=t=t.replace(i,"");this.currencySymbol&&(r=t.replace(this.currencySymbolUpdate,"")),r&&(r=parseFloat(r)+""),t=this.currencySymbol?this.currencySymbolUpdate+r:r,this.valueUpdate=t,t&&t!=this.currencySymbolUpdate&&(a=this.zeroFilling(t)),a&&(this.valueUpdate=a),this.valueUpdate=this.formatInit(this.valueUpdate);var n=this.toRound(this.value);!this.isChange&&n&&(n=this.isNumeric?parseFloat(n):parseFloat(n)+"",this.$emit("input",n)),this.isChange=!1,this.isFocus=!1,this.$emit("blur",e)},handleChange:function(e){this.$emit("change",e)},handlerCompositionend:function(e){var t=e.data.length;this.currentElement.setRangeText("",this.currentElement.selectionStart-t,this.currentElement.selectionStart,"end"),this.$emit("compositionend",e)},handleInput:function(e){this.isChange=!0,this.format(e);var t=e.target.value,i=void 0,a=new RegExp(this.digitalGroupSpacingSymbol,"g");if(e.detail&&(i=e.detail),e.data&&(i=e.data),"allow"!=this.leadingZero)if(this.currencySymbol){if("0"==t[1]&&i>="1"&&i<="9"&&3==e.target.selectionStart){var r=t.replace(this.currencySymbolUpdate,"");-1==r.indexOf("0.")&&(t=this.currencySymbolUpdate+r.replace(/^0*/,""))}}else"0"==t[0]&&i>="1"&&i<="9"&&2==e.target.selectionStart&&-1==t.indexOf("0.")&&(t=t.replace(/^0*/,""));if(this.valueUpdate=t,t=t.replace(a,""),this.currencySymbol){var n=this.currencySymbolUpdate;t=t.replace(n,"")}t&&(t=this.isNumeric?parseFloat(t):parseFloat(t)+""),this.$emit("input",t)},handleTextInput:function(){this.$emit("textInput")},formatInit:function(e){e+="";var t=this.digitalGroupSpacing,i=new RegExp("\\d{1,"+t+"}(?=(\\d{"+t+"})+(\\.\\d*)?$)","g"),a=new RegExp(this.digitalGroupSpacingSymbol,"g");if(e.indexOf(".")>0){var r=e.substr(e.indexOf(".")+1);return e.substr(0,e.indexOf(".")).replace(a,"").replace(i,"$&"+this.digitalGroupSpacingSymbol)+"."+r}return e.replace(a,"").replace(i,"$&"+this.digitalGroupSpacingSymbol)},format:function(e){var t=e.target.value,i=0,a=new RegExp(this.digitalGroupSpacingSymbol,"g");this.currencySymbol&&(i=this.currencySymbolUpdate.length);for(var r=0;r<t.length;r++){var n=void 0;t[r]==this.digitalGroupSpacingSymbol&&(n=r,this.currentElement.setRangeText("",n,n+1)),t=e.target.value}var l=t.replace(a,""),u=l.length-i;-1!=l.indexOf(".")&&(u=l.split(".")[0].length-i);var s=Math.floor(u/this.digitalGroupSpacing);u%this.digitalGroupSpacing==0&&(s=u/this.digitalGroupSpacing-1);for(var c=0;c<s;c++){var o=u%this.digitalGroupSpacing+c*this.digitalGroupSpacing+c+i;u%this.digitalGroupSpacing==0&&(o=this.digitalGroupSpacing+c*this.digitalGroupSpacing+c+i),this.currentElement.setRangeText(this.digitalGroupSpacingSymbol,o,o)}},maxlengthActual:function(e){e+="";var t=new RegExp(this.digitalGroupSpacingSymbol,"g"),i=e.replace(t,""),a="",r=0;-1!=i.indexOf(".")&&(r=1,i.split(".")[0].length,a=i.split(".")[1].length);var n=this.maxlength-r-a,l=Math.floor(n/this.digitalGroupSpacing);return n%this.digitalGroupSpacing==0&&(l=n/this.digitalGroupSpacing-1),this.currencySymbolUpdate?this.maxlength+l+this.currencySymbolUpdate.length:this.maxlength+l}}};