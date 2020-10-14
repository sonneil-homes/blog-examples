
/* Email correction */
/*! mailcheck v1.1.2 @licence MIT */var Mailcheck={domainThreshold:2,secondLevelThreshold:2,topLevelThreshold:2,defaultDomains:["msn.com","bellsouth.net","telus.net","comcast.net","optusnet.com.au","earthlink.net","qq.com","sky.com","icloud.com","mac.com","sympatico.ca","googlemail.com","att.net","xtra.co.nz","web.de","cox.net","gmail.com","ymail.com","aim.com","rogers.com","verizon.net","rocketmail.com","google.com","optonline.net","sbcglobal.net","aol.com","me.com","btinternet.com","charter.net","shaw.ca"],defaultSecondLevelDomains:["yahoo","hotmail","mail","live","outlook","gmx"],defaultTopLevelDomains:["com","com.au","com.tw","ca","co.nz","co.uk","de","fr","it","ru","net","org","edu","gov","jp","nl","kr","se","eu","ie","co.il","us","at","be","dk","hk","es","gr","ch","no","cz","in","net","net.au","info","biz","mil","co.jp","sg","hu","uk"],run:function(a){a.domains=a.domains||Mailcheck.defaultDomains,a.secondLevelDomains=a.secondLevelDomains||Mailcheck.defaultSecondLevelDomains,a.topLevelDomains=a.topLevelDomains||Mailcheck.defaultTopLevelDomains,a.distanceFunction=a.distanceFunction||Mailcheck.sift4Distance;var b=function(a){return a},c=a.suggested||b,d=a.empty||b,e=Mailcheck.suggest(Mailcheck.encodeEmail(a.email),a.domains,a.secondLevelDomains,a.topLevelDomains,a.distanceFunction);return e?c(e):d()},suggest:function(a,b,c,d,e){a=a.toLowerCase();var f=this.splitEmail(a);if(c&&d&&-1!==c.indexOf(f.secondLevelDomain)&&-1!==d.indexOf(f.topLevelDomain))return!1;var g=this.findClosestDomain(f.domain,b,e,this.domainThreshold);if(g)return g==f.domain?!1:{address:f.address,domain:g,full:f.address+"@"+g};var h=this.findClosestDomain(f.secondLevelDomain,c,e,this.secondLevelThreshold),i=this.findClosestDomain(f.topLevelDomain,d,e,this.topLevelThreshold);if(f.domain){g=f.domain;var j=!1;if(h&&h!=f.secondLevelDomain&&(g=g.replace(f.secondLevelDomain,h),j=!0),i&&i!=f.topLevelDomain&&""!==f.secondLevelDomain&&(g=g.replace(new RegExp(f.topLevelDomain+"$"),i),j=!0),j)return{address:f.address,domain:g,full:f.address+"@"+g}}return!1},findClosestDomain:function(a,b,c,d){d=d||this.topLevelThreshold;var e,f=1/0,g=null;if(!a||!b)return!1;c||(c=this.sift4Distance);for(var h=0;h<b.length;h++){if(a===b[h])return a;e=c(a,b[h]),f>e&&(f=e,g=b[h])}return d>=f&&null!==g?g:!1},sift4Distance:function(a,b,c){if(void 0===c&&(c=5),!a||!a.length)return b?b.length:0;if(!b||!b.length)return a.length;for(var d=a.length,e=b.length,f=0,g=0,h=0,i=0,j=0,k=[];d>f&&e>g;){if(a.charAt(f)==b.charAt(g)){i++;for(var l=!1,m=0;m<k.length;){var n=k[m];if(f<=n.c1||g<=n.c2){l=Math.abs(g-f)>=Math.abs(n.c2-n.c1),l?j++:n.trans||(n.trans=!0,j++);break}f>n.c2&&g>n.c1?k.splice(m,1):m++}k.push({c1:f,c2:g,trans:l})}else{h+=i,i=0,f!=g&&(f=g=Math.min(f,g));for(var o=0;c>o&&(d>f+o||e>g+o);o++){if(d>f+o&&a.charAt(f+o)==b.charAt(g)){f+=o-1,g--;break}if(e>g+o&&a.charAt(f)==b.charAt(g+o)){f--,g+=o-1;break}}}f++,g++,(f>=d||g>=e)&&(h+=i,i=0,f=g=Math.min(f,g))}return h+=i,Math.round(Math.max(d,e)-h+j)},splitEmail:function(a){a=null!==a?a.replace(/^\s*/,"").replace(/\s*$/,""):null;var b=a.split("@");if(b.length<2)return!1;for(var c=0;c<b.length;c++)if(""===b[c])return!1;var d=b.pop(),e=d.split("."),f="",g="";if(0===e.length)return!1;if(1==e.length)g=e[0];else{f=e[0];for(var h=1;h<e.length;h++)g+=e[h]+".";g=g.substring(0,g.length-1)}return{topLevelDomain:g,secondLevelDomain:f,domain:d,address:b.join("@")}},encodeEmail:function(a){var b=encodeURI(a);return b=b.replace("%20"," ").replace("%25","%").replace("%5E","^").replace("%60","`").replace("%7B","{").replace("%7C","|").replace("%7D","}")}};"undefined"!=typeof module&&module.exports&&(module.exports=Mailcheck),"function"==typeof define&&define.amd&&define("mailcheck",[],function(){return Mailcheck}),"undefined"!=typeof window&&window.jQuery&&!function(a){a.fn.mailcheck=function(a){var b=this;if(a.suggested){var c=a.suggested;a.suggested=function(a){c(b,a)}}if(a.empty){var d=a.empty;a.empty=function(){d.call(null,b)}}a.email=this.val(),Mailcheck.run(a)}}(jQuery);

/* Form code */
jQuery(document).ready( function () {
    function suggestionEmail(element) {
        element.mailcheck({
            suggested: function(element, suggestion) {
                if(document.getElementById("hint")) document.getElementById("hint").remove();
                var hint = document.createElement("div");
                hint.setAttribute("id", "hint");
                hint.style.height = 0;
                var html = `<p 
                              style="cursor: pointer; line-height:0;" 
                              class="small p-2 pb-0 m-0"
                            >
                                <span class="btn-link">
                                    ${suggestion.full}
                                </span> ?
                            </p>`;
                hint.innerHTML = html;
                hint.addEventListener("click", () => {element[0].value = suggestion.full; document.getElementById("hint").remove();});
                element.after(hint);
            },
            empty: function(element) {
                if(document.getElementById("hint")) document.getElementById("hint").remove();
            }
        })
    }

    /* Client email validation */
    jQuery("#contact-form input[type='email'].form-control").each(function () {
        jQuery(this).blur(function() {
                suggestionEmail(jQuery(this));
        })
    })


});