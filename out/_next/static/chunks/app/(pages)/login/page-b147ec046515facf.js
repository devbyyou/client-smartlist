(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[826],{28:function(e,n,r){Promise.resolve().then(r.bind(r,8114))},8114:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return d}});var o=r(7437),t=r(6463),i=r(7965),s=r.n(i),a=r(6920),l=r(5079),c=r(2153),u=r(1885);function d(){let e=(0,t.useRouter)(),n=(0,c.C)(e=>e.login.credentials.email),r=(0,c.C)(e=>e.login.credentials.password),i=(0,c.C)(e=>e.login.errorLogin),d=(0,c.C)(e=>e.login.logged),g=(0,c.T)(),_=e=>n=>{let{value:r}=n.target;g((0,u.Yo)({value:r,field:e}))};async function m(e){e.preventDefault(),await g((0,u.x4)())}return!0===d&&setTimeout(()=>{e.push("/home")},100),(0,o.jsxs)("div",{className:s().loginPage,children:[(0,o.jsx)("header",{className:s().header,children:(0,o.jsx)("div",{className:s().cercleArrow,children:(0,o.jsx)("button",{className:s().backButton,onClick:()=>e.back(),children:(0,o.jsx)(a.G,{className:s().arrowLeft,icon:l.acZ})})})}),(0,o.jsxs)("main",{className:s().mainContent,children:[(0,o.jsx)("div",{className:s().divTitle,children:(0,o.jsxs)("h1",{className:s().title,children:["Welcome back",(0,o.jsx)("br",{})," to Smartli!"]})}),(0,o.jsxs)("form",{onSubmit:m,className:s().loginForm,method:"POST",action:"submit",children:[(0,o.jsxs)("div",{className:s().inputGroup,children:[(0,o.jsx)("label",{htmlFor:"email",className:s().label,children:"Email address"}),(0,o.jsxs)("div",{className:s().inputWrapper,children:[(0,o.jsx)(a.G,{icon:l.FU$}),(0,o.jsx)("input",{onChange:_("email"),type:"email",value:n,name:"email",id:"email",className:s().input,placeholder:"hello.john@email.com",required:!0})]})]}),(0,o.jsxs)("div",{className:s().inputGroup,children:[(0,o.jsx)("label",{htmlFor:"password",className:s().label,children:"Password"}),(0,o.jsxs)("div",{className:s().inputWrapper,children:[(0,o.jsx)(a.G,{icon:l.byT}),(0,o.jsx)("input",{onChange:_("password"),value:r,name:"password",type:"password",id:"password",className:s().input,placeholder:"********",required:!0}),(0,o.jsx)("span",{className:s().toggleVisibility,children:(0,o.jsx)(a.G,{icon:l.Aq})})]}),(0,o.jsx)("a",{href:"#",className:s().forgotPassword,children:"Forgot password?"})]}),i&&(0,o.jsx)("p",{className:"text-red-500 text-sm mt-2",children:i}),(0,o.jsx)("button",{type:"submit",className:s().signInButton,children:"Sign In"}),(0,o.jsx)("div",{className:s().orSeparator,children:"or with"}),(0,o.jsxs)("div",{className:s().socialLogin,children:[(0,o.jsx)("button",{className:s().socialButton,children:(0,o.jsx)(a.G,{color:"black",icon:l.uPb})}),(0,o.jsx)("button",{className:s().socialButton,children:(0,o.jsx)(a.G,{color:"#FBBC05",icon:l.mdI})}),(0,o.jsx)("button",{className:s().socialButton,children:(0,o.jsx)(a.G,{color:"#55ACEE",icon:l.$Oi})}),(0,o.jsx)("button",{className:s().socialButton,children:(0,o.jsx)(a.G,{icon:l.uj_,color:" rgba(0, 114, 233, 1)"})})]})]}),(0,o.jsxs)("footer",{className:s().footer,children:[(0,o.jsx)("span",{children:"New User?"}),(0,o.jsx)("a",{href:"/register",className:s().signUpLink,children:"Sign Up"})]})]})]})}},2153:function(e,n,r){"use strict";r.d(n,{C:function(){return i},T:function(){return t}});var o=r(1444);let t=o.I0,i=o.v9},1885:function(e,n,r){"use strict";r.d(n,{Yo:function(){return c},x4:function(){return l}});var o=r(6862),t=r(7062),i=r(8626),s=r(153);let a={logged:!1,errorLogin:null,credentials:{email:"",password:"",name:""},userId:0,...(0,s.$U)()},l=(0,t.a)("login/LOGIN",async(e,n)=>{try{let{email:e,password:r}=n.getState().login.credentials,o=await i.b.post("auth/login",{email:e,password:r});return(0,s.DX)(o.data),o.data}catch(e){console.log("error catch",e)}}),c=(0,o.PH)("login/CHANGE_CREDENTIALS_FIELD"),u=(0,o.Lq)(a,e=>{e.addCase(c,(e,n)=>{let{field:r,value:o}=n.payload;e.credentials[r]=o}).addCase(l.fulfilled,(e,n)=>{n.payload&&(e.logged=n.payload.logged),e.credentials.email="",e.credentials.password=""}).addCase(l.rejected,(e,n)=>{console.error(Error)})});n.ZP=u},8626:function(e,n,r){"use strict";r.d(n,{b:function(){return i}});var o=r(8472),t=r(153);let i=o.Z.create({baseURL:"/api"});i.interceptors.request.use(e=>{let n=(0,t.$U)(),r=n?n.access_token:null;return r&&(e.headers.Authorization="Bearer ".concat(r)),e},e=>Promise.reject(e))},7062:function(e,n,r){"use strict";r.d(n,{a:function(){return o}});let o=r(6862).hg.withTypes()},153:function(e,n,r){"use strict";r.d(n,{$U:function(){return t},DX:function(){return s},TD:function(){return a},kS:function(){return i}});var o=r(9714);let t=()=>{let e=localStorage.getItem("token");if(!e)return null;try{return JSON.parse(e)}catch(e){return console.error("Erreur lors de la r\xe9cup\xe9ration des donn\xe9es utilisateur:",e),null}},i=()=>{localStorage.removeItem("token"),localStorage.clear()},s=e=>{try{localStorage.setItem("token",JSON.stringify(e))}catch(e){console.error("Erreur lors de la sauvegarde des donn\xe9es utilisateur:",e)}},a=e=>{try{return(0,o.o)(e)}catch(e){return console.error("Erreur lors du d\xe9codage du token:",e),null}}},7965:function(e){e.exports={loginPage:"Login_loginPage__nbpZV",header:"Login_header__Gv9wW",backButton:"Login_backButton__LOxbg",arrowLeft:"Login_arrowLeft__pSfP_",mainContent:"Login_mainContent__I_G_Y",divTitle:"Login_divTitle__oF85d",title:"Login_title__bz238",loginForm:"Login_loginForm__B0BCr",inputGroup:"Login_inputGroup__DxrTZ",label:"Login_label__iXlbz",inputWrapper:"Login_inputWrapper__FbORn",input:"Login_input__72vlH",toggleVisibility:"Login_toggleVisibility__xdnUs",forgotPassword:"Login_forgotPassword__Muzp3",signInButton:"Login_signInButton__wy5P1",orSeparator:"Login_orSeparator__iyoC4",socialLogin:"Login_socialLogin___dDAF",socialButton:"Login_socialButton__RP6YF",footer:"Login_footer__OUzrc",signUpLink:"Login_signUpLink__YWHJH",cercleArrow:"Login_cercleArrow__vQ_nl"}}},function(e){e.O(0,[876,676,657,168,797,971,23,744],function(){return e(e.s=28)}),_N_E=e.O()}]);