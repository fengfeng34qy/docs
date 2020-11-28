"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.Dialog = exports.Utils = exports.Validator = void 0;
var _numberInput = require("./number-input"),
  _numberInput2 = _interopRequireDefault(_numberInput),
  _textInput = require("./text-input"),
  _textInput2 = _interopRequireDefault(_textInput),
  _adminInput = require("./admin-input"),
  _adminInput2 = _interopRequireDefault(_adminInput),
  _textArea = require("./text-area"),
  _textArea2 = _interopRequireDefault(_textArea),
  _button = require("./button"),
  _button2 = _interopRequireDefault(_button),
  _datePicker = require("./date-picker"),
  _datePicker2 = _interopRequireDefault(_datePicker),
  _loading = require("./loading"),
  _loading2 = _interopRequireDefault(_loading),
  _stepper = require("./stepper"),
  _stepper2 = _interopRequireDefault(_stepper),
  _gridLayout = require("./grid-layout"),
  _gridLayout2 = _interopRequireDefault(_gridLayout),
  _checkbox = require("./checkbox"),
  _checkbox2 = _interopRequireDefault(_checkbox),
  _radio = require("./radio"),
  _radio2 = _interopRequireDefault(_radio),
  _password = require("./password"),
  _password2 = _interopRequireDefault(_password),
  _dialog = require("./dialog"),
//   _select = require("./select"),
//   _select2 = _interopRequireDefault(_select),
  _tab = require("./tab"),
  _tab2 = _interopRequireDefault(_tab),
  _validator = require("./validator"),
  _validator2 = _interopRequireDefault(_validator),
  _common = require("./common"),
  _table = require("./table"),
  _table2 = _interopRequireDefault(_table),
  _currencyInput = require("./currency-input"),
  _currencyInput2 = _interopRequireDefault(_currencyInput),
  _tip = require("./tip"),
  _tip2 = _interopRequireDefault(_tip),
  _text = require("./text"),
  _text2 = _interopRequireDefault(_text),
  _box = require("./box"),
  _box2 = _interopRequireDefault(_box),
  _tileMenu = require("./tile-menu"),
  _tileMenu2 = _interopRequireDefault(_tileMenu),
  _counterInput = require("./counter-input"),
  _counterInput2 = _interopRequireDefault(_counterInput),
  _selectPopover = require("./select-popover"),
  _selectPopover2 = _interopRequireDefault(_selectPopover),
  _progress = require("./progress"),
  _progress2 = _interopRequireDefault(_progress),
  _switch = require("./switch"),
  _switch2 = _interopRequireDefault(_switch),
  _cascader = require("./cascader"),
  _cascader2 = _interopRequireDefault(_cascader);

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
var components = [_textInput2.default, _numberInput2.default, _adminInput2.default, _textArea2.default, _button2.default, _stepper2.default, _gridLayout2.default, _checkbox2.default, _radio2.default, _password2.default, _tab2.default, _datePicker2.default, _loading2.default, _table2.default, _currencyInput2.default, _tip2.default, _text2.default, _box2.default, _tileMenu2.default, _counterInput2.default, _selectPopover2.default, _progress2.default, _switch2.default, _cascader2.default],
  install = function (e, t) {
    components.forEach(function (t) {
      e.use(t)
    })
  };
exports.default = {
  install: install
}, exports.Validator = _validator2.default, exports.Utils = _common.Utils, exports.Dialog = _dialog.Dialog;
