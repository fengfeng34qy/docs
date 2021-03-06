"";
Object.defineProperty(exports, "__esModule", {
  value: !0
});
var _dialog = require("./dialog"),
  _dialog2 = _interopRequireDefault(_dialog);

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
exports.default = {
  render: function anonymous() {
    with(this) return _c("transition", {
      attrs: {
        name: "dialog-fade"
      },
      on: {
        "after-enter": onAfterEnter,
        "after-leave": onAfterLeave
      }
    }, [visible ? _c("div", {
      staticClass: "dialog-window",
      on: {
        click: function (e) {
          if (e.target !== e.currentTarget) return null;
          handleWrapperClick(e)
        }
      }
    }, [_c(content, {
      ref: "dialogContent",
      tag: "component",
      staticClass: "aui-content-presenter",
      attrs: {
        dialogBoxContentArgs: dialogBoxContentArgs
      }
    })], 1) : _e()])
  },
  name: "dialog-window",
  props: ["content", "closeContentModalRestPart"],
  data: function () {
    return {
      visible: !1,
      dialogContentResult: void 0,
      dialogBoxContentArgs: void 0,
      isRealClose: !0
    }
  },
  methods: {
    onAfterEnter: function () {
      var e = this.$refs.dialogContent;
      e && e.onNavigated && e.onNavigated()
    },
    onAfterLeave: function () {
      this.$emit("doRealClose", this.dialogContentResult)
    },
    onClose: function () {
      var e = this.$refs.dialogContent;
      e && (e.onClose && e.onClose(), this.dialogContentResult = e.result)
    },
    handleWrapperClick: function () {
      this.closeContentModalRestPart && _dialog2.default.close(this)
    }
  }
};
