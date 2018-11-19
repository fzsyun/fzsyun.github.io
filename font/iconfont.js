;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-zanting" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M740.5967 162.5743c33.9282 0 61.698 34.1053 61.698 75.7924v547.971072c0 41.686-27.7699 75.7821-61.698 75.7821h-30.839808c-33.9292 0-61.6929-34.0961-61.6929-75.7821V238.36672000000002c0-41.687 27.7637-75.7924 61.6929-75.7924H740.596736z"  ></path>' +
    '' +
    '<path d="M314.2922 162.5743c33.9313 0 61.696 34.1053 61.696 75.7924v547.971072c0 41.686-27.7658 75.7821-61.696 75.7821H283.45651200000003c-33.9343 0-61.698-34.0961-61.698-75.7821V238.36672000000002c0-41.687 27.7637-75.7924 61.698-75.7924H314.29222400000003z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-zanting1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M836.146986 467.531362 256.119798 11.79491c-16.628721-13.055337-39.272434-15.482618-58.288528-6.23091-19.016094 9.237382-31.085987 28.536932-31.085987 49.683549l0 911.471879c0 21.14764 12.069893 40.433887 31.085987 49.685595 7.673771 3.722787 15.941059 5.556551 24.14081 5.556551 12.164037 0 24.221651-4.019546 34.147718-11.814067L836.146986 554.410033c13.32549-10.46535 21.106708-26.48725 21.106708-43.427056C857.253693 494.017588 849.473498 478.023317 836.146986 467.531362zM277.226506 853.056747 277.226506 168.898974l435.37164 342.085027L277.226506 853.056747z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)