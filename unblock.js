(function(id) {
    var win = window,
        userId = id,
        makeid = function() {
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_",
                text = possible.charAt(Math.floor(Math.random() * 50)),
                length = Math.floor(Math.random() * (8 - 4)) + 4;
            for (var i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text
        },
        funcName = makeid(),
        iframeName = makeid(),
        detector = function() {
            if (isBot(navigator.userAgent.toLowerCase())) return;
            var iframe = document.createElement('iframe'),
                html = ['<!doctype html><html><head><script>function u() {', 'setTimeout(function(){', 'parent.window["' + funcName + '"].call(parent.window,', ((/adregain\.([a-z]{2,3})\/walltest\.php/).test(location.href) === !0 ? '!0' : '!(window.adsbygoogle&&window.adsbygoogle.loaded===!0)'), ');', '}, 100);', '}</', 'script></head><body onload="u()">', '<script src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></', 'script>', '</body></html>'].join(''),
                doc = null,
                styles = {
                    "display": "block",
                    "position": "absolute",
                    "left": "-9999px",
                    "top": "0",
                    "width": "1px",
                    "height": "1px",
                    "border": "0"
                };
            iframe.src = "about:blank";
            iframe.id = iframeName;
            iframe.name = iframeName;
            iframe.width = "1";
            iframe.height = "1";
            iframe.frameBorder = "0";
            iframe.allowtransparency = "1";
            iframe.scrolling = "no";
            document.body.appendChild(iframe);
            for (var key in styles) {
                iframe.style[key] = styles[key]
            }
            doc = iframe.contentWindow.document;
            doc.open();
            doc.write(html);
            doc.close()
        },
        isBot = function(userAgent) {
            var tests = ['aolbuild', 'baidu', 'bingbot', 'bingpreview', 'msnbot', 'duckduckgo', 'adsbot-google', 'googlebot', 'mediapartners-google', 'teoma', 'slurp', 'yandex', 'bot', 'spider', 'crawl'],
                reg = null;
            for (var idx in tests) {
                reg = new RegExp(tests[idx]);
                if (reg.test(userAgent)) {
                    return true
                }
            }
            return false
        };
    win['adregain_wall'] = true;
    if (win.addEventListener) {
        win.addEventListener('load', detector, false)
    } else if (win.attachEvent) {
        win.attachEvent('onload', detector)
    }
    win[funcName] = function(isBlocked) {
        if (isBlocked) {
            try {
                var showIn = 3 * 1000,
                    boxId = makeid(),
                    closeId = makeid(),
                    sheet = (function() {
                        var style = document.createElement("style");
                        style.appendChild(document.createTextNode(""));
                        document.head.appendChild(style);
                        return style.sheet
                    })(),
                    domWorker = {
                        isArray: function(a) {
                            return Object.prototype.toString.call(a) === "[object Array]"
                        },
                        make: function(desc) {
                            if (!this.isArray(desc)) {
                                return this.make.call(this, Array.prototype.slice.call(arguments))
                            }
                            var name = desc[0];
                            var attributes = desc[1];
                            var el = document.createElement(name);
                            var start = 1;
                            if (typeof attributes === "object" && attributes !== null && !this.isArray(attributes)) {
                                for (var attr in attributes) {
                                    el[attr] = attributes[attr]
                                }
                                start = 2
                            }
                            for (var i = start; i < desc.length; i++) {
                                if (this.isArray(desc[i])) {
                                    el.appendChild(this.make(desc[i]))
                                } else {
                                    var tmp = document.createElement("span");
                                    tmp.innerHTML = desc[i];
                                    el.appendChild(tmp)
                                }
                            }
                            return el
                        }
                    };

                function addCSSRule(sheet, selector, rules, index) {
                    if ("insertRule" in sheet) {
                        sheet.insertRule(selector + "{" + rules + "}", index)
                    } else if ("addRule" in sheet) {
                        sheet.addRule(selector, rules, index)
                    }
                }
                var closeBtnCss = ['position:relative', 'display:inline-block', 'height:20px', 'width:auto', 'margin:20px auto', 'padding:10px 20px', 'background:#799759', 'color:#ffffff', 'font:bold 16px/21px sans-serif', 'vertical-align:middle', 'text-align:center', 'cursor:pointer', 'border-radius:10px'],
                    boxCss = ['position:relative', 'background:#efe4b0', 'color:#000000', 'padding:0px', 'display:block', 'text-align:center', 'margin:10px', 'box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.3)', 'border:1px solid #999999', 'border-radius:10px', 'font-size:18px'],
                    handCss = ['text-align:center', 'content:"\u270B"', 'display:block', 'width:30px', 'color:#ffffff', 'background:#c6bb84', 'position:absolute', 'left:0', 'top:0', 'height:100%', 'font-size:20px', 'line-height:2.9em', 'vertical-align:bottom', 'border-top-left-radius: 10px;border-bottom-left-radius: 10px'];
                addCSSRule(sheet, '#' + closeId, closeBtnCss.sort(function() {
                    return 0.5 - Math.random()
                }).join(';'), 0);
                addCSSRule(sheet, '#' + boxId, boxCss.sort(function() {
                    return 0.5 - Math.random()
                }).join(';'), 1);
                addCSSRule(sheet, '#' + boxId + ' > div', "padding:10% 10% 10% 20%;text-align:left", 2);
                addCSSRule(sheet, '#' + boxId + ' > div:before', handCss.sort(function() {
                    return 0.5 - Math.random()
                }).join(';'), 3);
                var topBox = domWorker.make("div", ["div", {
                        "id": boxId
                    },
                    ["div", "Our website exists with the support from advertisement. Please disable ad block! (<a href=\"https://dzonebloggers.blogspot.com/\">How to disable?</a>)"],
                    ["span", {
                        "id": closeId
                    }, "Ok, adblocker is off"]
                ], "");
                showIn = showIn < 1000 ? 200 : showIn;
                if (typeof window.localStorage !== "undefined" && null === window.localStorage.getItem('regainShow')) {
                    window.localStorage.setItem('regainShow', 0)
                }
                setTimeout(function() {
                    var newBody = document.body;
                    newBody.innerHTML = "";
                    newBody.appendChild(topBox);
                    topBox = document.getElementById(boxId);
                    var windowHeightHalf = Math.max(window.innerHeight, document.documentElement.clientHeight, document.body.clientHeight) / 2,
                        marTop = windowHeightHalf - (topBox.offsetHeight / 2) - 100;
                    document.getElementById(closeId).onclick = function() {
                        window.location.reload(true)
                    };
                    addCSSRule(sheet, 'body', "background:#eee", 4);
                    addCSSRule(sheet, 'body > div', "width:100%;max-width:650px;margin:" + (marTop > 0 ? marTop : 50) + "px auto 0;", 5)
                }, showIn)
            } catch (e) {
                throw (e)
            }
        }
    }
}).call(this, '')
