"";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = {
  render: function anonymous() {
    with(this) return _c("div", {
      staticClass: "date-pick-Popover"
    }, [_c("button", {
      on: {
        click: closePopover
      }
    }, [_v("关闭")]), _v(" "), _c("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: popoverDefault,
        expression: "popoverDefault"
      }],
      staticClass: "date-pick-Popover-default"
    }, [_c("div", {
      staticClass: "date-pick-Popover-default-item date-pick-Popover-default-year"
    }, [_c("div", {
      staticClass: "date-pick-Popover-default-title"
    }, [_v(_s(yearChecked) + "年")]), _v(" "), _c("div", {
      staticClass: "date-pick-Popover-default-year-checked-box"
    }), _v(" "), _c("div", {
      staticClass: "date-pick-Popover-default-year-content",
      on: {
        touchmove: yearTouchMoveHandler,
        touchstart: yearTouchStartHandler,
        touchend: yearTouchEndHandler,
        scroll: scrollHandler
      }
    }, [_c("ul", _l(yearList, function (e, t) {
      return _c("li", {
        key: t,
        ref: "hei" + t,
        refInFor: !0,
        staticClass: "yearItem date-pick-Popover-default-year-level2",
        class: {
          "date-pick-Popover-default-year-checked": e == yearChecked, "date-pick-Popover-default-year-level1": e == yearChecked - 2 || e == yearChecked + 2, "date-pick-Popover-default-year-diisabled": e > maxDate.getFullYear() || e < minDate.getFullYear()
        }
      }, [_v(_s(e))])
    }))])]), _v(" "), _c("div", {
      staticClass: "date-pick-Popover-default-item date-pick-Popover-default-month"
    }, [_c("div", {
      staticClass: "date-pick-Popover-default-title"
    }, [_v(_s(monthCheckedComputed) + "月")]), _v(" "), _c("div", {
      staticClass: "date-pick-Popover-default-month-content"
    }, _l(monthList, function (e, t) {
      return _c("div", {
        key: t,
        staticClass: "monthLine"
      }, _l(e, function (e, t) {
        return _c("div", {
          key: t,
          staticClass: "monthItem",
          on: {
            click: monthClickHandler
          }
        }, [_c("span", {
          class: {
            "month-checked": e == monthChecked
          }
        }, [_v(_s(e))])])
      }))
    }))]), _v(" "), _c("div", {
      staticClass: "date-pick-Popover-default-item date-pick-Popover-default-day"
    }, [_c("div", {
      staticClass: "date-pick-Popover-default-title"
    }, [_v(_s(dayCheckedComputed) + "日")]), _v(" "), _c("div", {
      staticClass: "date-pick-Popover-default-day-content"
    }, [_c("div", {
      staticClass: "week"
    }, _l(weekList, function (e, t) {
      return _c("div", {
        key: t
      }, [_v(_s(e))])
    })), _v(" "), _c("div", {
      staticClass: "day"
    }, [_l(dateList.pM, function (e, t) {
      return _c("div", {
        key: t + "pDay",
        staticClass: "pDay",
        on: {
          click: pDayCheck
        }
      }, [_v(_s(e))])
    }), _v(" "), _l(dateList.cM, function (e, t) {
      return _c("div", {
        key: t + "cDay",
        staticClass: "cDay",
        on: {
          click: cDayCheck
        }
      }, [_c("span", {
        class: {
          "day-checked": dayChecked == e
        }
      }, [_v(_s(e))])])
    }), _v(" "), _l(dateList.nM, function (e, t) {
      return _c("div", {
        key: t + "nDay",
        staticClass: "nDay",
        on: {
          click: nDayCheck
        }
      }, [_v(_s(e))])
    })], 2)])])])])
  },
  name: "",
  data: function () {
    return {
      yearChecked: (new Date).getFullYear(),
      monthChecked: (new Date).getMonth() + 1,
      dayChecked: (new Date).getDate(),
      type: this.$parent.type,
      timer: void 0,
      ontouch: !1,
      yearTop: void 0,
      isInit: !1,
      monthList: [
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
        [9, 10],
        [11, 12]
      ],
      weekList: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      maxDate: this.$parent.max,
      minDate: this.$parent.min,
      options: this.$parent.options
    }
  },
  computed: {
    maxYear: function (e) {
      var t = this.maxDate.getFullYear();
      return console.log("最大年份", t), !0
    },
    monthCheckedComputed: function () {
      return 1 === this.monthChecked.toString().length ? "0" + this.monthChecked : this.monthChecked
    },
    dayCheckedComputed: function () {
      return 1 === this.dayChecked.toString().length ? "0" + this.dayChecked : this.dayChecked
    },
    dateList: function () {
      for (var e = {
          pM: [],
          cM: [],
          nM: []
        }, t = new Date(this.yearChecked, this.monthChecked, 0).getDate(), a = 1; a <= t; a++) e.cM.push(a);
      var o = new Date(this.yearChecked, this.monthChecked - 1, 1).getDay();
      0 === o && (o = 7);
      for (var c = new Date(this.yearChecked, this.monthChecked - 1, 0).getDate(), n = c; n > c - o + 1; n--) e.pM.push(n);
      e.pM.reverse();
      for (var i = 42 - e.cM.length - e.pM.length, s = 1; s <= i; s++) e.nM.push(s);
      return e
    },
    popoverDefault: function () {
      return !this.type || "default" === this.type || "week" === this.type
    },
    popoverMonth: function () {
      return "month" === this.type
    },
    popoverYear: function () {
      return "year" === this.type
    },
    yearList: function () {
      for (var e = [], t = 1900; t < 2100; t++) e.push(t);
      return e
    },
    yearClass: function () {}
  },
  props: {},
  mounted: function () {
    var e = this;
    console.log("最小日期" + this.minDate), console.log("最大日期" + this.maxDate), console.log("options:" + this.options);
    var t = Array.from(document.getElementsByClassName("yearItem"));
    setTimeout(function () {
      t[e.yearChecked - 1900].scrollIntoView({
        behavior: "smooth"
      })
    }, 1e3)
  },
  methods: {
    pDayCheck: function (e) {
      1 == this.monthChecked ? (this.monthChecked = 12, this.yearChecked = this.yearChecked - 1, this.dayChecked = e.target.textContent) : (this.monthChecked = this.monthChecked - 1, this.dayChecked = e.target.textContent)
    },
    cDayCheck: function (e) {
      this.dayChecked = e.target.textContent, this.closePopover(), this.$emit("checked", new Date(1 * this.yearChecked, 1 * this.monthCheckedComputed - 1, 1 * this.dayCheckedComputed))
    },
    nDayCheck: function (e) {
      12 == this.monthChecked ? (this.monthChecked = 1, this.yearChecked = this.yearChecked + 1, this.dayChecked = e.target.textContent) : (this.monthChecked = this.monthChecked + 1, this.dayChecked = e.target.textContent)
    },
    monthClickHandler: function (e) {
      this.monthChecked = e.target.textContent
    },
    scrollHandler: function () {
      var e = this;
      this.timer && clearTimeout(this.timer), this.timer = setTimeout(function () {
        var t = [];
        e.yearTop = e.yearTop || document.getElementsByClassName("date-pick-Popover-default-year-content")[0].getBoundingClientRect().top;
        var a = Array.from(document.getElementsByClassName("yearItem"));
        a.forEach(function (e) {
          t.push(e.getBoundingClientRect().top)
        });
        for (var o = 0; o < t.length; o++)
          if (t[o] > e.yearTop) {
            e.isInit && a[o + 2].scrollIntoView({
              behavior: "smooth"
            }), e.isInit = !1, e.yearChecked = o + 1902, console.log();
            break
          }
      }, 50)
    },
    closePopover: function () {
      this.$parent.closePopover()
    },
    yearTouchEndHandler: function (e) {
      this.ontouch = !1
    },
    yearTouchStartHandler: function (e) {
      this.ontouch = !0, this.isInit = !0
    },
    yearTouchMoveHandler: function (e) {}
  }
};
