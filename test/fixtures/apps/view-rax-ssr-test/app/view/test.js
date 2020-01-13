!(function(e, t) {
  for (var n in t) e[n] = t[n];
})(
  exports,
  (function(e) {
    var t = {};
    function n(r) {
      if (t[r]) return t[r].exports;
      var a = (t[r] = { i: r, l: !1, exports: {} });
      return e[r].call(a.exports, a, a.exports, n), (a.l = !0), a.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
      }),
      (n.r = function(e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (n.t = function(e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var a in e)
            n.d(
              r,
              a,
              function(t) {
                return e[t];
              }.bind(null, a)
            );
        return r;
      }),
      (n.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return n.d(t, "a", t), t;
      }),
      (n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = "/public/"),
      n((n.s = 1))
    );
  })([
    function(e, t) {
      e.exports = require("react");
    },
    function(e, t, n) {
      "use strict";
      n.r(t);
      var r = n(0),
        a = n.n(r);
      class o extends r.Component {
        render() {
          return a.a.createElement(
            "html",
            null,
            a.a.createElement(
              "head",
              null,
              a.a.createElement("title", null, this.props.title),
              a.a.createElement("meta", { charSet: "utf-8" }),
              a.a.createElement("meta", {
                name: "viewport",
                content:
                  "initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"
              }),
              a.a.createElement("meta", {
                name: "keywords",
                content: this.props.keywords
              }),
              a.a.createElement("meta", {
                name: "description",
                content: this.props.description
              }),
              a.a.createElement("link", {
                rel: "shortcut icon",
                href: "/favicon.ico",
                type: "image/x-icon"
              })
            ),
            a.a.createElement(
              "body",
              null,
              a.a.createElement("div", { id: "app" }, this.props.children)
            )
          );
        }
      }
      class l extends r.Component {
        render() {
          return a.a.createElement(
            o,
            this.props,
            a.a.createElement("h2", null, this.props.message)
          );
        }
      }
      t.default = l.asyncData
        ? l
        : class extends r.Component {
            render() {
              return a.a.createElement(l, this.props);
            }
          };
    }
  ])
);
