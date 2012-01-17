// jTypeWriter, JQuery plugin
// v 1.1 
// Licensed under GPL licenses.
// Copyright (C) 2008 Nikos "DuMmWiaM" Kontis, info@dummwiam.com
// http://www.DuMmWiaM.com/jTypeWriter
// ----------------------------------------------------------------------------
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// ----------------------------------------------------------------------------

// eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(7($){$.u.v=7(b){5 c,8,w,r,x,A;5 d=$.W({},$.u.v.H,b);5 e=d.I*J;5 f=d.K.X();5 g=d.L;5 h=d.M;5 j=d.9;5 k=d.N;5 l=d.O;5 m=(f=="Y")?" ":".";5 n=P Q();5 o=0;y(i=0;i<q.p;i++){4(j){$(q[i]).9(j)}4(f=="s")n.R({3:$(q[i]),6:$(q[i]).9()});t n.R({3:$(q[i]),6:$(q[i]).9().Z(m)});4(!g)o=n[i].6.p>o?n[i].6.p:o;t o+=n[i].6.p;$(q[i]).9("")}B();7 B(){c=e/o;8=0;w=r=0;x=(!g)?C(S,c):C(T,c)};7 S(){8++;y(i=0;i<n.p;i++){5 a=n[i];4(a.6.p>=8){4(f=="s"){a.3.9(a.6.U(0,8))}t{a.3.z(a.6[8-1]);4(8<o){a.3.z(m)}}}}4(8>=o){D()}};7 T(){$3=n[w];4(f=="s"){$3.3.9($3.6.U(0,++r))}t{$3.3.z($3.6[r++]);4(r<$3.6.p)$3.3.z(m)}4(r>=$3.6.p){w++;r=0}8++;4(8>=o){D()}};7 D(){E(x);4(f!="s"){}4(k){4(l)A=C(V,l*J);t F()}h()};7 F(){y(i=0;i<n.p;i++){n[i].3.9("")}B()};7 V(){F();E(A)};7 G(){E(x);y(i=0;i<n.p;i++){n[i].3.9(n[i].6)}};q.G=G;10 q};$.u.v.H={I:2,K:"s",L:11,M:7(){},9:"",N:12,O:0};$.u.v.13={14:P Q()}})(15);',62,68,'|||obj|if|var|initialText|function|nIntervalCounter|text||||||||||||||||length|this|nSequentialCounterInternal|letter|else|fn|jTypeWriter|nSequentialCounter|nInterval|for|append|nLoopInterval|init|setInterval|circleEnd|clearInterval|newLoop|endEffect|defaults|duration|1000|type|sequential|onComplete|loop|loopDelay|new|Array|push|typerSimultaneous|typerSequential|substr|loopInterval|extend|toLowerCase|word|split|return|true|false|variables|aObjects|jQuery'.split('|'),0,{}))

// jTypeWriter, JQuery plugin
// v 1.1 
// Licensed under GPL licenses.
// Copyright (C) 2008 Nikos "DuMmWiaM" Kontis, info@dummwiam.com
// http://www.DuMmWiaM.com/jTypeWriter
// ----------------------------------------------------------------------------
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// ----------------------------------------------------------------------------

(function($) {
	$.fn.jTypeWriter = function (b) {
		var c, nIntervalCounter, nSequentialCounter, nSequentialCounterInternal, nInterval, nLoopInterval;
		var d = $.extend({}, $.fn.jTypeWriter.defaults, b);
		var e = d.duration * 1000;
		var f = d.type.toLowerCase();
		var g = d.sequential;
		var h = d.onComplete;
		var j = d.text;
		var k = d.loop;
		var l = d.loopDelay;
		var m = (f == "word") ? " " : ".";
		var n = new Array();
		var o = 0;
		for (i = 0; i < this.length; i++) {
			if (j) {
				$(this[i]).text(j)
			}
			if (f == "letter") n.push({
				obj: $(this[i]),
				initialText: $(this[i]).text()
			});
			else n.push({
				obj: $(this[i]),
				initialText: $(this[i]).text().split(m)
			});
			if (!g) o = n[i].initialText.length > o ? n[i].initialText.length : o;
			else o += n[i].initialText.length;
			$(this[i]).text("")
		}
		init();

		function init() {
			c = e / o;
			nIntervalCounter = 0;
			nSequentialCounter = nSequentialCounterInternal = 0;
			nInterval = (!g) ? setInterval(typerSimultaneous, c) : setInterval(typerSequential, c)
		};

		function typerSimultaneous() {
			nIntervalCounter++;
			for (i = 0; i < n.length; i++) {
				var a = n[i];
				if (a.initialText.length >= nIntervalCounter) {
					if (f == "letter") {
						a.obj.text(a.initialText.substr(0, nIntervalCounter))
					} else {
						a.obj.append(a.initialText[nIntervalCounter - 1]);
						if (nIntervalCounter < o) {
							a.obj.append(m)
						}
					}
				}
			}
			if (nIntervalCounter >= o) {
				circleEnd()
			}
		};

		function typerSequential() {
			$obj = n[nSequentialCounter];
			if (f == "letter") {
				$obj.obj.text($obj.initialText.substr(0, ++nSequentialCounterInternal))
			} else {
				$obj.obj.append($obj.initialText[nSequentialCounterInternal++]);
				if (nSequentialCounterInternal < $obj.initialText.length) $obj.obj.append(m)
			}
			if (nSequentialCounterInternal >= $obj.initialText.length) {
				nSequentialCounter++;
				nSequentialCounterInternal = 0
			}
			nIntervalCounter++;
			if (nIntervalCounter >= o) {
				circleEnd()
			}
		};

		function circleEnd() {
			clearInterval(nInterval);
			if (f != "letter") {}
			if (k) {
				if (l) nLoopInterval = setInterval(loopInterval, l * 1000);
				else newLoop()
			}
			h()
		};

		function newLoop() {
			for (i = 0; i < n.length; i++) {
				n[i].obj.text("")
			}
			init()
		};

		function loopInterval() {
			newLoop();
			clearInterval(nLoopInterval)
		};

		function endEffect() {
			clearInterval(nInterval);
			for (i = 0; i < n.length; i++) {
				n[i].obj.text(n[i].initialText)
			}
		};
		this.endEffect = endEffect;
		return this
	};
	$.fn.jTypeWriter.defaults = {
		duration: 2,
		type: "letter",
		sequential: true,
		onComplete: function () {},
		text: "",
		loop: false,
		loopDelay: 0
	};
	$.fn.jTypeWriter.variables = {
		aObjects: new Array()
	}
})(jQuery);