/*
============================================
; Title:  base-response.js
; Author: Professor Krasso
; Modified By: Kevin Jones
; Date: 30 Aug 2021
; Description: Base response model for the
; API request/ response pattern
;===========================================
*/

// base response model
class BaseResponse {
  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  toObject() {
    return {
      code: this.code,
      msg: this.msg,
      data: this.data,
      timestamp: new Date().toLocaleDateString(),
    };
  }
}

module.exports = BaseResponse;
