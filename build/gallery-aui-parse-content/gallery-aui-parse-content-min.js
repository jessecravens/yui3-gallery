YUI.add("gallery-aui-parse-content",function(d){var k=d.Lang,c=k.isString,l="append",a="documentElement",n="firstChild",i="head",m="host",f="innerHTML",g="ParseContent",e="queue",j="script",h="src";var b=d.Component.create({NAME:g,NS:g,ATTRS:{queue:{value:null}},EXTENDS:d.Plugin.Base,prototype:{initializer:function(){var o=this;b.superclass.initializer.apply(this,arguments);o.set(e,new d.AsyncQueue());o._bindAOP();},globalEval:function(q){var r=d.getDoc();var p=r.one(i)||r.get(a);var o=document.createElement(j);o.type="text/javascript";if(q){o.text=k.trim(q);}p.appendChild(o).remove();},parseContent:function(q){var o=this;var p=o._clean(q);o._dispatch(p);return p;},_bindAOP:function(){var o=this;this.doBefore("insert",function(r){var q=Array.prototype.slice.call(arguments);var p=o.parseContent(r);q.splice(0,1,p.fragment);return new d.Do.AlterArgs(null,q);});this.doBefore("setContent",function(q){var p=o.parseContent(q);return new d.Do.AlterArgs(null,[p.fragment]);});},_clean:function(q){var o={};var p=d.Node.create("<div></div>");p.append("<div>_</div>");if(c(q)){d.DOM.addHTML(p,q,l);}else{p.append(q);}o.js=p.all(j).each(function(s,r){s.remove();});p.get(n).remove();o.fragment=p.get("childNodes").toFrag();return o;},_dispatch:function(q){var p=this;var o=p.get(e);q.js.each(function(s,r){var t=s.get(h);if(t){o.add({autoContinue:false,fn:function(){d.Get.script(t,{onEnd:function(u){u.purge();o.run();}});},timeout:0});}else{o.add({fn:function(){var u=s._node;p.globalEval(u.text||u.textContent||u.innerHTML||"");},timeout:0});}});o.run();}}});d.namespace("Plugin").ParseContent=b;},"gallery-2011.02.09-21-32",{skinnable:false,requires:["async-queue","gallery-aui-base","plugin"]});