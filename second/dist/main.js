(()=>{"use strict";window.Widget={button:function(e){var n=document.createElement("button");return n.id=e.id,n.textContent=e.label,n.onclick=e.onClick,{element:n}},ul:function(e){var n=document.createElement("ul");return n.style.listStyle="none",n.style.padding="0",n.id=e.id,t(e.datas,e.columns),{element:n,reload:function(c){n.innerHTML="",t(c,e.columns)}};function t(e,t){e.forEach((function(e){var c=document.createElement("li");t.forEach((function(n){var t=n.render(e);c.append(t)})),n.append(c)}))}},input:function(e){var n=document.createElement("input");return n.type=e.type,n.id=e.id,n.checked=e.done,n.onclick=e.onClick,{element:n}},span:function(e){var n=document.createElement("span");return n.textContent=e.content,{element:n}}}})();