(this.webpackJsonp=this.webpackJsonp||[]).push([["saas-connect"],{"+O3e":function(t){t.exports=JSON.parse('{"sw-saas-connect":{"component":{},"module":{"sw-my-apps":{"general":{"mainMenuItemGeneral":"Meine Apps","moduleDescription":"Modul zum Anzeigen appspezifischer Inhalte"}}},"extension":{"component":{}}}}')},"+yP1":function(t,e,n){},"3LRT":function(t,e,n){},"9r+r":function(t,e){t.exports='{% block sw_page_smart_bar_content_actions %}\n    {% block sw_page_smart_bar_content_app_actions %}\n        <div class="smart-bar__app_actions" v-if="areActionsAvailable">\n            <sw-context-button class="sw-page__connect-action-buttons">\n                <template slot="button">\n                    <sw-button>\n                        <sw-icon name="small-more" size="16"></sw-icon>\n                    </sw-button>\n                </template>\n\n                <sw-connect-action-button\n                    v-for="action in actions"\n                    :key="action.id"\n                    :action="action"\n                    @run-app-action="runAction">\n                </sw-connect-action-button>\n            </sw-context-button>\n        </div>\n    {% endblock %}\n\n    {% parent() %}\n{% endblock %}\n'},CbZS:function(t,e,n){var a=n("3LRT");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);(0,n("SZ7m").default)("ef1adcf6",a,!0,{})},Cl50:function(t,e,n){var a={"./":"nIvA","./index":"nIvA","./index.js":"nIvA","./sw-my-apps":"aE52","./sw-my-apps/":"aE52","./sw-my-apps/components/sw-my-apps-timeout-animation":"ydR2","./sw-my-apps/components/sw-my-apps-timeout-animation/":"ydR2","./sw-my-apps/components/sw-my-apps-timeout-animation/index":"ydR2","./sw-my-apps/components/sw-my-apps-timeout-animation/index.js":"ydR2","./sw-my-apps/components/sw-my-apps-timeout-animation/sw-my-apps-timeout-animation.html":"Rm0H","./sw-my-apps/components/sw-my-apps-timeout-animation/sw-my-apps-timeout-animation.scss":"JOGt","./sw-my-apps/index":"aE52","./sw-my-apps/index.js":"aE52","./sw-my-apps/page/sw-my-apps-page":"VAf/","./sw-my-apps/page/sw-my-apps-page/":"VAf/","./sw-my-apps/page/sw-my-apps-page/index":"VAf/","./sw-my-apps/page/sw-my-apps-page/index.js":"VAf/","./sw-my-apps/page/sw-my-apps-page/sw-my-apps-page.html":"mF2B","./sw-my-apps/page/sw-my-apps-page/sw-my-apps-page.html.twig":"mF2B","./sw-my-apps/page/sw-my-apps-page/sw-my-apps-page.scss":"CbZS"};function i(t){var e=s(t);return n(e)}function s(t){if(!n.o(a,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return a[t]}i.keys=function(){return Object.keys(a)},i.resolve=s,t.exports=i,i.id="Cl50"},F9L8:function(t,e,n){var a={"./structure/sw-admin-menu/index.js":"MjBU","./structure/sw-page/index.js":"MLJG"};function i(t){var e=s(t);return n(e)}function s(t){if(!n.o(a,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return a[t]}i.keys=function(){return Object.keys(a)},i.resolve=s,t.exports=i,i.id="F9L8"},I7eR:function(t,e,n){var a={"./connect-apps.state":"Sbwa"};function i(t){var e=s(t);return n(e)}function s(t){if(!n.o(a,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return a[t]}i.keys=function(){return Object.keys(a)},i.resolve=s,t.exports=i,i.id="I7eR"},IB0P:function(t,e,n){},JOGt:function(t,e,n){var a=n("uqN+");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);(0,n("SZ7m").default)("55414f0b",a,!0,{})},MLJG:function(t,e,n){"use strict";n.r(e);var a=n("9r+r"),i=n.n(a);n("fApv");const{Mixin:s}=Shopware;e.default={template:i(),name:"sw-page",data:()=>({actions:null}),computed:{appActionButtonService:()=>Shopware.Service("AppActionButtonService"),params(){return this.isListingPage?Object.keys(this.$parent.selection):this.$route.params.id?[this.$route.params.id]:[]},isListingPage(){const t=this.$parent.$options.mixins,e=s.getByName("listing");return!!t&&void 0!==t.find(t=>t===e)},areActionsAvailable(){return!!this.actions&&this.actions.length>0&&this.params.length>0}},watch:{$route:{immediate:!0,async handler(t,e){e?this.didViewChange(t,e)&&(this.actions=await this.getActionButtons(t)):this.actions=await this.getActionButtons(t)}}},methods:{async getActionButtons(t){const e=t.meta.$module;if(!e)return[];const n=e.entity,a=this.getViewForRoute(t);if(!n||!a)return[];try{return this.isLoading=!0,await this.appActionButtonService.getActionButtonsPerView(n,a)}finally{this.isLoading=!1}},runAction(t){this.appActionButtonService.runAction(t,{ids:this.params})},getViewForRoute(t){const e=t.meta.$module;if(e)return Object.keys(e.routes).find(n=>{const a=e.routes[n].name;return t.name.startsWith(a)})},didViewChange(t,e){return(e.meta.$module?e.meta.$module.entity:void 0)!==(t.meta.$module?t.meta.$module.entity:void 0)||this.getViewForRoute(e)!==this.getViewForRoute(t)}}}},MjBU:function(t,e,n){"use strict";n.r(e),e.default={name:"sw-admin-menu",computed:{appEntries:()=>Shopware.State.getters["connect-apps/navigation"]},watch:{appEntries(){this.updateAppEntries()},mainMenuEntries(){this.updateAppEntries()}},methods:{updateAppEntries(){const t=this.mainMenuEntries.findIndex(t=>"sw-my-apps"===t.id);t<=-1||(this.mainMenuEntries[t].children=this.appEntries,this.mainMenuEntries[t]={...this.mainMenuEntries[t]})}}}},Rm0H:function(t,e){t.exports='<div class="sw-my-apps-timeout-animation">\n    Loading your app resulted in a timeout\n</div>'},Sbwa:function(t,e,n){"use strict";n.r(e),e.default={namespaced:!0,state:()=>({apps:[]}),getters:{navigation:t=>t.apps.reduce((t,e)=>(t.push(...function(t){const e=Shopware.State.get("session").currentLocale,n=Shopware.Context.app.fallbackLocale,a=t.label[e]||t.label[n];return t.modules.map(i=>{const s=i.label[e]||i.label[n];return{id:`app-${t.name}-${i.name}`,path:"sw.my.apps.index",params:{appName:t.name,moduleName:i.name},label:{translated:!0,label:`${a} - ${s}`},color:"#9AA8B5",parent:"sw-my-apps",children:[]}})}(e)),t),[])},mutations:{setApps(t,e){t.apps=e}},actions:{fetchAppModules:({commit:t})=>Shopware.Service("AppModulesService").fetchAppModules().then(e=>{t("setApps",e)})}}},"VAf/":function(t,e,n){"use strict";n.r(e);var a=n("mF2B"),i=n.n(a),s=(n("CbZS"),n("ydR2"));e.default={name:"sw-my-apps-page",template:i(),props:{appName:{type:String,required:!0},moduleName:{type:String,required:!0}},data:()=>({appLoaded:!1,timedOut:!1,timedOutTimeout:null}),computed:{currentLocale:()=>Shopware.State.get("session").currentLocale,fallbackLocale:()=>Shopware.Context.app.fallbackLocale,appDefinition(){return Shopware.State.get("connect-apps").apps.find(t=>t.name===this.appName)},moduleDefinition(){return this.appDefinition?this.appDefinition.modules.find(t=>t.name===this.moduleName):null},suspend(){return!this.appDefinition||!this.moduleDefinition},heading(){if(this.suspend)return this.$tc("sw-saas-connect.module.sw-my-apps.general.mainMenuItemGeneral");const t=this.translate(this.appDefinition.label),e=this.translate(this.moduleDefinition.label);return`${t}${t&&e?" - ":""}${e}`},entryPoint(){return this.suspend?null:this.moduleDefinition.source},origin(){if(!this.entryPoint)return null;return new URL(this.entryPoint).origin},innerFrame(){return this.$refs.innerFrame}},watch:{entryPoint(){this.appLoaded=!1,this.timedOut=!1},appLoaded:{immediate:!0,handler(t){clearTimeout(this.timedOutTimeout),this.timedOutTimeout=null,t||(this.timedOutTimeout=setTimeout(()=>{this.appLoaded||(this.timedOut=!0)},5e3))}}},mounted(){window.addEventListener("message",this.onContentLoaded,this.$refs.innerFrame)},beforeDestroy(){window.removeEventListener("message",this.onContentLoaded)},methods:{translate(t){return t[this.currentLocale]||t[this.fallbackLocale]},onContentLoaded(t){t.origin===this.origin&&"connect-app-loaded"===t.data&&(this.appLoaded=!0)}},components:{"sw-my-apps-time-out-animation":s.default}}},Vnye:function(t,e,n){"use strict";n.r(e);var a=n("trgU"),i=n.n(a);n("vYs7");e.default={template:i(),name:"sw-connect-action-button",props:{action:{type:Object,required:!0}},computed:{buttonLabel(){const t=Shopware.State.get("session").currentLocale,e=Shopware.Context.app.fallbackLocale;return this.action.label[t]||this.action.label[e]||""},openInNewTab(){return!!this.action.openNewTab},linkData(){return this.openInNewTab?{target:"_blank",href:this.action.url}:{}}},methods:{runAction(){this.openInNewTab||this.$emit("run-app-action",this.action.id)}}}},aE52:function(t,e,n){"use strict";n.r(e);var a=n("VAf/");e.default={type:"plugin",name:"sw-my-apps",title:"sw-saas-connect.module.sw-my-apps.general.mainMenuItemGeneral",description:"sw-saas-connect.module.sw-my-apps.general.moduleDescription",icon:"default-view-grid",color:"#9AA8B5",routePrefixPath:"my-apps",components:{"sw-my-apps-page":a.default},routes:{index:{component:"sw-my-apps-page",path:":appName/:moduleName",props:{default(t){const{appName:e,moduleName:n}=t.params;return{appName:e,moduleName:n}}}}},navigation:[{id:"sw-my-apps",label:"sw-saas-connect.module.sw-my-apps.general.mainMenuItemGeneral",icon:"default-view-grid",color:"#9AA8B5",position:100}]}},eUqz:function(t){t.exports=JSON.parse('{"sw-saas-connect":{"component":{},"module":{"sw-my-apps":{"general":{"mainMenuItemGeneral":"My apps","moduleDescription":"Module to show app specific content"}}},"extension":{"component":{}}}}')},fApv:function(t,e,n){var a=n("IB0P");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);(0,n("SZ7m").default)("6e44b4e0",a,!0,{})},mF2B:function(t,e){t.exports='<sw-page class="sw-my-apps-page">\n    <template #smart-bar-header>\n        <h2>{{ heading }}</h2>\n    </template>\n\n    <template #content>\n        <template v-if="!suspend">\n            <iframe\n                id="app-content"\n                class="sw-my-apps-page__app-content"\n                ref="innerFrame"\n                referrerpolicy="origin-when-cross-origin"\n                :src="entryPoint"\n                :title="heading"\n                v-show="appLoaded">\n            </iframe>\n            <template v-if="!appLoaded">\n                <template v-if="timedOut">\n                   <sw-my-apps-time-out-animation></sw-my-apps-time-out-animation>\n                </template>\n                <template v-else>\n                    <sw-loader></sw-loader>\n                </template>\n            </template>\n        </template>\n    </template>\n</sw-page>'},nIvA:function(t,e,n){"use strict";function a(t){const{Module:e,Component:a}=t;["sw-my-apps"].forEach(t=>{const i=n("Cl50")(`./${t}`).default;i.components&&Object.keys(i.components).forEach(t=>{const e=i.components[t];e.extendsFrom?a.extend(t,e.extendsFrom,e):a.register(t,e)}),e.register(i.name,i)})}n.r(e),n.d(e,"installModules",(function(){return a}))},pthK:function(t,e,n){"use strict";n.r(e);class a{static get name(){return"AppActionButtonService"}constructor(t,e){this.httpClient=t,this.loginService=e,this.name="AppActionButtonService"}get basicHeaders(){return{"Content-Type":"application/json",Accept:"application/json","sw-language-id":Shopware.Context.api.languageId,Authorization:`Bearer ${this.loginService.getToken()}`}}getActionButtonsPerView(t,e){return this.httpClient.get(`app-system/action-button/${t}/${e}`,{headers:this.basicHeaders}).then(({data:t})=>this.getActionbuttonsFromRequest(t))}getActionbuttonsFromRequest(t){return t&&t.actions?t.actions:[]}runAction(t,e={}){return this.httpClient.post(`app-system/action-button/run/${t}`,e,{headers:this.basicHeaders}).then(({data:t})=>t)}}class i{static get name(){return"AppModulesService"}constructor(t,e){this.httpClient=t,this.loginService=e,this.name="AppModulesService"}get basicHeaders(){return{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${this.loginService.getToken()}`}}fetchAppModules(){return this.httpClient.get("app-system/modules",{headers:this.basicHeaders}).then(({data:t})=>t.modules||[])}}var s=function(t){t.Application.addServiceProvider(a.name,()=>{const e=t.Application.getContainer("init");return new a(e.httpClient,t.Service("loginService"))}),t.Application.addServiceProvider(i.name,()=>{const e=t.Application.getContainer("init");return new i(e.httpClient,t.Service("loginService"))})};var o=function(t){!function(t){const{Component:e}=t,a=n("F9L8");a.keys().forEach(t=>{const n=a(t).default;e.override(n.name,n,0)})}(t)};function p(){return Shopware.State.dispatch("connect-apps/fetchAppModules")}var r=n("nIvA");({install:function(t){s(t),function(t){const{State:e}=t;["connect-apps"].forEach(t=>{const a=n("I7eR")(`./${t}.state`).default;e.registerModule(t,a)})}(t),function(t){t.Locale.extend("de-DE",n("+O3e")),t.Locale.extend("en-GB",n("eUqz"))}(t),function(t){const{Component:e}=t,a=n("sgsT");a.keys().forEach(t=>{const n=a(t).default;e.register(n.name,n)})}(t),Object(r.installModules)(t),o(t),p()}}).install(Shopware)},sgsT:function(t,e,n){var a={"./sw-connect-action-button/index.js":"Vnye"};function i(t){var e=s(t);return n(e)}function s(t){if(!n.o(a,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return a[t]}i.keys=function(){return Object.keys(a)},i.resolve=s,t.exports=i,i.id="sgsT"},trgU:function(t,e){t.exports='{% block sw_connect_action_button %}\n    <component\n        :is="openInNewTab ? \'a\' : \'div\'"\n        class="sw-connect-action-button sw-context-menu-item"\n        :class="{ \'sw-context-menu-item--icon\': !!action.icon }"\n        @click="runAction"\n        v-bind="linkData">\n\n        <img\n            v-if="action.icon"\n            class="sw-connect-action-button__icon"\n            :src="\'data:image/png;base64, \' + action.icon">\n\n        <span class="sw-context-menu-item__text">\n            {{ buttonLabel }}\n            <sw-icon v-if="openInNewTab" name="default-action-external" size="12px"></sw-icon>\n        </span>\n    </component>\n{% endblock %}\n'},"uqN+":function(t,e,n){},vYs7:function(t,e,n){var a=n("+yP1");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);(0,n("SZ7m").default)("a7b7f87a",a,!0,{})},ydR2:function(t,e,n){"use strict";n.r(e);var a=n("Rm0H"),i=n.n(a);n("JOGt");e.default={name:"sw-my-apps-timeout-animation",template:i()}}},[["pthK","runtime","vendors-node"]]]);