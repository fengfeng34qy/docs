"";
Object.defineProperty(exports, "__esModule", {
  value: !0
});
var _Popover = require("./Popover"),
  _Popover2 = _interopRequireDefault(_Popover);

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
exports.default = {
  render: function anonymous() {
    with(this) return _c("div", {
      staticClass: "aui-date-pick"
    }, [_c("div", {
      staticClass: "date-pick-input",
      class: {
        isDisabled: disabled
      }
    }, [_c("input", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: value,
        expression: "value"
      }],
      staticClass: "date-pick-input-main",
      attrs: {
        type: "text",
        placeholder: placeholder,
        disabled: disabled
      },
      domProps: {
        value: value
      },
      on: {
        focus: focusHandler,
        input: function (e) {
          e.target.composing || (value = e.target.value)
        }
      }
    }), _v(" "), _c("span", {
      staticClass: "date-pick-input-line"
    }), _v(" "), _m(0)]), _v(" "), _c("transition", {
      attrs: {
        name: "fade"
      }
    }, [_c("popover", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: isDefaultPopoverShow,
        expression: "isDefaultPopoverShow"
      }],
      on: {
        checked: checked
      }
    }), _v(" "), isCustomerPopoverShow ? _t("default") : _e()], 2)], 1)
  },
  staticRenderFns: [function anonymous() {
    with(this) return _c("span", {
      staticClass: "date-pick-input-icon"
    }, [_c("i", {
      staticClass: "aui-icon-riqi"
    })])
  }],
  name: "aui-date-pick",
  data: function () {
    return {
      isDefaultPopoverShow: !1,
      isCustomerPopoverShow: !1,
      value: void 0
    }
  },
  computed: {},
  props: {
    type: {
      type: String,
      validator: function (e) {
        return "month" === e || "year" === e || "default" === e || "week" === e || !e
      }
    },
    placeholder: {
      type: String,
      default: "请选择日期"
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    max: Date,
    min: Date,
    options: Object
  },
  components: {
    Popover: _Popover2.default
  },
  mounted: function () {
    this.max && this.min && this.max.getTime() < this.min.getTime() && (console.error("最小日期不能大于最大日期"), console.error("最小日期：" + this.min), console.error(" 最大日期：" + this.max))
  },
  methods: {
    checked: function (e) {
      console.log("选择了日期", e), this.value = e, this.$emit("input", e), this.$emit("change", e)
    },
    showPopover: function () {
      this.$slots.default ? this.isCustomerPopoverShow = !0 : this.isDefaultPopoverShow = !0
    },
    closePopover: function () {
      this.$slots.default ? this.isCustomerPopoverShow = !1 : this.isDefaultPopoverShow = !1
    },
    focusHandler: function (e) {
      this.disabled || this.showPopover()
    },
    blurHandler: function (e) {
      this.closePopover()
    }
  }
};