(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3537],{60699:function(e,t,n){"use strict";n.r(t),n.d(t,{FileBrowser:function(){return W}});var i=n(52322),s=n(8939),o=n(99272),a=n(63244),l=n(66306),r=n(16399),d=n(89711),c=n(95753),p=n(57441),u=n(57643),h=n(5632),m=n(2784),f=n(17727),x=n(56359),_=n(64129),g=n(95486),b=n(15585),w=n.n(b);let v=e=>{let{path:t,onUpload:n,setShowUploadDialog:s,accept:o="image/*,audio/*,video/*"}=e;return(0,i.jsx)(w(),{styles:{dropzone:{border:0,overflow:"hidden",height:"100%"}},getUploadParams:e=>{let{meta:n}=e;return{url:"/adminapi/v1/files/"+t}},onChangeStatus:(e,t)=>{let{meta:i,file:s}=e;"done"==t&&(console.log("CHANGE STATUS",t,i,s),n({meta:i,file:s}))},onSubmit:(e,t)=>{console.log(e.map(e=>e.meta)),t.forEach(e=>e.remove()),s(!1)},submitButtonContent:"Close",accept:o})};var j=n(455),y=n(65058),C=n(6289),S=n(752);let q=(e,t)=>{let[n,i]=(0,S.KO)(e);return t&&n.isPending?[t,i]:[n,i]};var E=n(51813),k=n(48115),F=n(91838),A=n(53596);let N="  _dsp-inline _bxs-border-box _ww-break-word _mt-0px _mr-0px _mb-0px _ml-0px _col-549765356 ",$=(0,A.j)();(0,x._5)({iconComponent:_.K});let P=(0,y.cn)((0,C.E)("pending",[])),D=e=>{var t;let{currentPath:n,customActions:a,onOpen:l,onUpload:d,filesState:c}=e,p=(0,g.Fg)();p.color.val.replace(/^#/,"%23");let[u,h]=q(P,c),[_,b]=(0,m.useState)(!1),[w,y]=(0,m.useState)(!1),[C,S]=(0,m.useState)(!1),[A,D]=(0,m.useState)(!1),[O,R]=(0,m.useState)([]),[T,z]=(0,m.useState)(null),L=(0,m.useRef)({id:null,time:0}),I=n&&n.startsWith("/")?n:n?"/"+n:"/",V=async()=>{var e;h(null!==(e=await k.bl.get("/adminapi/v1/files/"+I))&&void 0!==e?e:{data:[]})},M=()=>{},W=[...a.filter(e=>!e.filter||e.filter(I,O)).map(e=>e.action),x.p$.UploadFiles,x.p$.DownloadFiles,x.p$.DeleteFiles],U=[x.p$.SelectAllFiles.id,x.p$.ClearSelection.id,x.p$.OpenSelection.id],{resolvedTheme:H}=(0,r.P)(),K=u&&u.data?u.data.map(e=>({...e,thumbnailUrl:e.name.endsWith(".png")||e.name.endsWith(".jpg")||e.name.endsWith(".jpeg")?"/adminapi/v1/files/"+e.path:void 0})):[],B=[{id:"/",name:"Files",isDir:!0}].concat(...I.split("/").map((e,t,n)=>({name:e,id:n.slice(0,t+1).join("/"),isDir:!0}))),Y=e=>{$.info({files:e},"Uploaded files"),y(!0),b(!1)},Z=e=>{let t=e.state.selectedFilesForAction.map(e=>({name:e.name,isDirectory:e.isDir}));R(t),S(!0)},G=e=>{let t=e.state.selectedFilesForAction.filter(e=>!e.isDir).map(e=>e.name);t.length&&(1==t.length?window.open("/adminapi/v1/files/"+n+"/"+t[0]+"?download=1","_new"):(R(t),D(!0)))};return(0,i.jsx)(f.ZP,{onDragEnter:()=>y(!0),noClick:!0,onDrop:Y,onUpload:Y,children:e=>{var r,d;let{getRootProps:c,getInputProps:p}=e;return(0,i.jsxs)(s.FA,{flex:1,...c(),children:[(0,i.jsx)(E.a,{p:"$5",acceptCaption:"Close",setOpen:D,open:A,hideAccept:!0,title:(0,i.jsx)(F.I,{children:(0,i.jsx)("span",{className:N,children:"Download"})}),description:"Use those links to download:",children:(0,i.jsx)(s.FA,{f:1,children:O.map((e,t)=>(0,i.jsx)("a",{href:"/adminapi/v1/files/"+n+"/"+e+"?download=1",target:"_new",children:(0,i.jsxs)("div",{className:"  _bg-0hover-549765387 _o-0hover-1 _dsp-flex _fd-row _fb-auto _bxs-border-box _pos-relative _mih-0px _miw-0px _fs-0 _mb-1481558214 _btlr-1881200781 _btrr-1881200781 _bbrr-1881200781 _bblr-1881200781 _pt-1481558214 _pr-1316330145 _pb-1481558214 _pl-1316330145 _bg-549765449 _o-0d0t746 _ai-center _jc-center ",children:[(0,i.jsx)(j.U,{}),(0,i.jsx)("span",{className:"  is_SizableText _col-675002279 _dsp-inline _bxs-border-box _ww-break-word _mt-0px _mr-0px _mb-0px _ml-1481558214 _ff-299667014 _fow-233016140 _ls-167744059 _fos-229441220 _lh-222976573 font_body ",children:e})]})},t))})}),(0,i.jsx)(E.a,{acceptButtonProps:{color:"white",backgroundColor:"$red9"},p:"$5",acceptCaption:"Delete",setOpen:S,open:C,onAccept:async e=>{var t;await k.bl.post("/adminapi/v1/deleteItems/"+n,O),h(null!==(t=await k.bl.get("/adminapi/v1/files/"+n))&&void 0!==t?t:{data:[]})},acceptTint:"red",title:(0,i.jsxs)("span",{className:"  _dsp-inline _bxs-border-box _ww-break-word _mt-0px _mr-0px _mb-0px _ml-0px _col-312414400 ",children:["Delete",O.length>1?" "+O.length+" files?":"?"]}),description:"The following files will be deleted:",children:(0,i.jsx)(s.FA,{f:1,children:O.map(e=>(0,i.jsx)("p",{className:"  is_Paragraph _col-675002279 _dsp-inline _bxs-border-box _ww-break-word _mt-0px _mr-0px _mb-0px _ml-0px _ff-299667014 _fow-233016140 _ls-167744059 _fos-229441220 _lh-222976573 _ussel-auto font_body ",children:e.name}))})}),(0,i.jsx)(E.a,{onPress:e=>{e.stopPropagation()},p:"$5",acceptCaption:"Close",setOpen:z,open:T,hideAccept:!0,title:(0,i.jsx)(F.I,{children:(0,i.jsx)("span",{className:N,children:null==T?void 0:T.title})}),description:null==T?void 0:T.description,children:(0,i.jsx)(s.FA,{minWidth:null==T?void 0:null===(r=T.size)||void 0===r?void 0:r.width,h:null==T?void 0:null===(d=T.size)||void 0===d?void 0:d.height,f:1,children:T&&T.getComponent&&T.getComponent(O,I,z,async()=>h(null!==(t=await k.bl.get("/adminapi/v1/files/"+n))&&void 0!==t?t:{data:[]}))})}),(0,i.jsxs)(s.FA,{f:1,children:[(0,i.jsx)("input",{...p()}),(0,i.jsx)(F.I,{children:(0,i.jsxs)(x.fy,{onFileAction:e=>{if("open_files"==e.id)l(e.payload.targetFile);else if("upload_files"==e.id)y(!0);else if("delete_files"==e.id)Z(e);else if("download_files"==e.id)G(e);else if("change_selection"===e.id)R(e.state.selectedFiles);else if("mouse_click_file"==e.id)750>Math.abs(Date.now()-L.current.time)&&e.payload.file.id==L.current.id?(L.current={id:null,time:0},l(e.payload.file)):(L.current.time=Date.now(),L.current.id=e.payload.file.id);else{let t=a.find(t=>t.action.id==e.id);t&&z(t),$.info({data:e},"File action")}},disableDragAndDrop:!0,disableDefaultFileActions:U,disableSelection:!1,darkMode:"dark"==H,files:K,folderChain:B,fileActions:W,children:[(0,i.jsx)(x.Tn,{}),(0,i.jsx)(x.TY,{}),(0,i.jsx)(x.mF,{onScroll:M})]})}),(0,i.jsxs)(o.Vq,{open:w,onOpenChange:y,children:[(0,i.jsxs)(o.Vq.Portal,{children:[(0,i.jsx)(o.Vq.Overlay,{}),(0,i.jsxs)(o.Vq.Content,{p:0,backgroundColor:"dark"==H?"#1e1e1e":"white",height:"600px",width:"600px",children:[(0,i.jsx)(v,{path:n,onUpload:V,setShowUploadDialog:y}),(0,i.jsx)(o.Vq.Close,{})]})]}),(0,i.jsx)(o.Vq.Adapt,{when:"sm",children:(0,i.jsxs)(o.Vq.Sheet,{children:[(0,i.jsx)(o.Vq.Sheet.Frame,{children:(0,i.jsx)(o.Vq.Adapt.Contents,{})}),(0,i.jsx)(o.Vq.Sheet.Overlay,{})]})})]})]})]})}})};n(62880);var O=n(84291),R=n(50117),T=n(82614);let z=e=>{let{onCreate:t,buttonText:n,defaultInput:s=""}=e,[o,a]=(0,m.useState)(s);return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("div",{className:"  _dsp-flex _fd-column _fb-auto _bxs-border-box _pos-relative _mih-0px _miw-0px _fs-1 _fg-1 _jc-center _ai-center ",children:[(0,i.jsx)(O.II,{width:"300px",mt:"$7",value:o,onChange:e=>a(e.target.value)}),(0,i.jsx)(l.zx,{onPress:()=>t(o),mt:"$6",width:"150px",children:n})]})})},L=[{getComponent:(e,t)=>{if(e.length){let n=document.location.origin+t.slice(17)+"/"+e[0].name;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(R.f,{mt:"$10",text:n}),(0,i.jsx)("div",{className:"  _ai-stretch _dsp-flex _fd-column _fb-auto _bxs-border-box _pos-relative _mih-0px _miw-0px _fs-0 _mt-1316330269 _ml-auto _mr-auto ",children:(0,i.jsx)(T.p,{href:n,target:"_blank",children:(0,i.jsx)("span",{className:"  _col-675002279 _dsp-inline _bxs-border-box _ww-break-word _mt-0px _mr-0px _mb-0px _ml-0px _fow-600 ",children:"Open link"})})})]})}return(0,i.jsx)(i.Fragment,{})},title:"Public link",filter:(e,t)=>e.startsWith("/apps/next/public")&&1==t.length&&!t[0].isDir,size:{width:500,height:200},action:{id:"getPublicLink",button:{name:"Get link",toolbar:!0,icon:x.IS.share}}},{getComponent:(e,t,n,s)=>(0,i.jsx)(z,{buttonText:"Create directory",onCreate:e=>{k.bl.post("/adminapi/v1/directories/"+t.replace(/\/+/g,"/")+"/"+e,{content:""}),n(!1),s()}}),title:"Create folder",size:{width:500,height:200},action:{id:"makedir",button:{name:"Create folder",toolbar:!0,icon:x.IS.folderCreate,group:"Actions"}}},{getComponent:(e,t,n,s)=>(0,i.jsx)(z,{buttonText:"Create file",onCreate:e=>{k.bl.post("/adminapi/v1/files/"+t.replace(/\/+/g,"/")+"/"+e,{content:""}),n(!1),s()}}),title:"Create file",size:{width:500,height:200},action:{id:"makefile",button:{name:"Create file",toolbar:!0,icon:x.IS.file,group:"Actions"}}},{getComponent:(e,t,n,s)=>(console.log("PSEEEEEEEEEL",e),(0,i.jsx)(z,{buttonText:"Rename",defaultInput:e[0].name,onCreate:i=>{k.bl.post("/adminapi/v1/renameItem",{currentPath:t.replace(/\/+/g,"/")+"/"+e[0].name,newName:i}),n(!1),s()}})),title:"Rename",filter:(e,t)=>1==t.length,size:{width:500,height:200},action:{id:"rename",button:{name:"Rename",toolbar:!0,icon:x.IS.folderChainSeparator,group:"Actions"}}}];n(72841);let I=[...L];var V=n(81412);let M=(0,A.j)(),W=e=>{var t;let{file:n,path:f,filesState:x}=e,[_,g]=(0,m.useState)(!!n),[b,w]=(0,m.useState)(f),[v,j]=(0,m.useState)(n||""),y=v.split("/")[v.split("/").length-1],C=(0,h.useRouter)(),[S,q]=(0,m.useState)(!1),[E,k]=(0,m.useState)(!1);(0,u.rf)(()=>{M.debug({query:C.query.path,newpath:b},"query: ".concat(C.query.path," newpath: ").concat(b));let e=(b.startsWith("/")?"":"/")+b;C.query.path!=b&&C.push({pathname:C.pathname,query:{...C.query,path:e}},void 0,{shallow:!0})},[b]),(0,u.rf)(()=>{if(v)g(!0);else{let e={...C.query};delete e.file,C.replace({pathname:C.pathname,query:e},void 0,{shallow:!0})}},[v]),(0,u.rf)(()=>{let e=C.query.path&&C.query.path.split?C.query.path.split("\\").join("/"):"";if(M.debug("current path: ".concat(e)),C.query.file){let t=(e+"/"+C.query.file).replace(/\/+/g,"/");j(t)}else j(""),g(!1),M.debug("useEffect fired! ".concat(e)),w(e)},[C.query.path,C.query.file]);let{resolvedTheme:A}=(0,r.P)(),N=null===(t=C.query)||void 0===t?void 0:t.file,$=()=>(0,i.jsx)(d.l,{hideCloseIcon:!!N,isModified:E,setIsModified:k,icons:[(0,i.jsx)(c.q,{onPress:()=>{if(E)return q(!0);j(""),g(!1)},children:(0,i.jsx)(p.X,{color:"var(--color)",size:"$1"})})],currentFileName:y,backgroundColor:N?"$colorTransparent":"dark"==A?"#1e1e1e":"white",currentFile:v,mt:20});return N?$():(0,i.jsxs)(s.FA,{overflow:"hidden",f:1,backgroundColor:"$colorTransparent",pt:4,pl:4,children:[(0,i.jsx)(D,{currentPath:b,filesState:x,customActions:I,onOpen:e=>{var t;if(M.debug({file:e},"on open client: ".concat(JSON.stringify(e))),e.isDir)return w(null!==(t=e.path)&&void 0!==t?t:e.id);C.push("files?path="+(b.startsWith("/")?"":"/")+b+"&file="+e.name)}}),(0,i.jsxs)(o.Vq,{open:_,onOpenChange:e=>{g(e),j("")},children:[(0,i.jsxs)(o.Vq.Portal,{children:[(0,i.jsx)(o.Vq.Overlay,{}),(0,i.jsxs)(o.Vq.Content,{p:0,backgroundColor:"dark"==A?"#1e1e1e":"white",height:"90%",width:"90%",children:[$(),(0,i.jsx)(F.I,{children:(0,i.jsx)(V.default,{tags:["doc","files"],zIndex:999999999,onScreen:_,mode:"popup"})}),(0,i.jsx)(o.Vq.Close,{})]})]}),(0,i.jsx)(o.Vq.Adapt,{when:"sm",children:(0,i.jsxs)(o.Vq.Sheet,{children:[(0,i.jsx)(o.Vq.Sheet.Frame,{children:(0,i.jsx)(o.Vq.Adapt.Contents,{})}),(0,i.jsx)(o.Vq.Sheet.Overlay,{})]})})]}),(0,i.jsx)(a.aR,{open:S,onOpenChange:q,native:!0,children:(0,i.jsxs)(a.aR.Portal,{children:[(0,i.jsx)(a.aR.Overlay,{opacity:.5},"overlay"),(0,i.jsx)(a.aR.Content,{bordered:!0,elevate:!0,x:0,scale:1,opacity:1,y:0,children:(0,i.jsxs)(s.FA,{space:!0,children:[(0,i.jsx)(a.aR.Description,{children:"The current file contains unsaved changes. Are you sure you want to close it without saving?"}),(0,i.jsxs)(s.sL,{space:"$3",justifyContent:"flex-end",children:[(0,i.jsx)(a.aR.Cancel,{asChild:!0,children:(0,i.jsx)(l.zx,{children:"Cancel"})}),(0,i.jsx)(a.aR.Action,{asChild:!0,children:(0,i.jsx)(l.zx,{onPress:()=>{k(!1),j(""),g(!1),q(!1)},theme:"active",children:"Close file"})})]})]})},"content")]})})]})}},81412:function(e,t,n){"use strict";n.r(t);var i=n(52322),s=n(2784),o=n(93589),a=n(1201),l=n(48115),r=n(91838),d=n(57643),c=n(1599),p=n(88724),u=n(5993),h=n(17029),m=n(752),f=n(66306),x=n(8939);t.default=e=>{let{tags:t=[],zIndex:n=1,onScreen:_=!0,mode:g="default"}=e,[b,w]=(0,s.useState)(!0),[v,j]=(0,m.KO)(a.qF),y=(0,s.useRef)(),C=()=>{let e=document.querySelector(".rcw-messages-container");e&&(e.scrollTop=e.scrollHeight)};(0,d.tj)(e=>{e.target.classList.contains("rcw-input")&&e.target.focus()});let S=e=>{let t=e.parentNode.parentNode.parentNode,n=document.createElement("img");n.src="/images/youtube-play.svg",n.style.width="".concat(e.offsetWidth,"px"),n.style.height="".concat(e.offsetHeight,"px"),n.style.position="absolute",n.style.transformOrigin="center",n.style.transform="scale(0.20)",n.style.cursor="Pointer",n.style.pointerEvents="none",n.style.left="15px",n.style.top="15px","static"===getComputedStyle(t).position&&(t.style.position="relative"),t.appendChild(n)},{width:q,height:E}=(0,d.iP)(),k=(e,t)=>{if(y.current){let n=y.current.getBoundingClientRect(),i=-((t-n.top)*1),s=-((e-n.right)*1);y.current.firstChild&&n.bottom===n.top&&n.bottom&&(y.current.firstChild.style.bottom=i+"px",y.current.firstChild.style.right=s+"px")}};(0,s.useEffect)(()=>{let e=new MutationObserver(e=>{e.forEach(e=>{"childList"===e.type&&e.addedNodes.length&&e.addedNodes.forEach(e=>{if(e.nodeType===Node.ELEMENT_NODE&&(e.classList.contains("rcw-message")||e.classList.contains("rcw-conversation-container"))){let t=e.getElementsByClassName("rcw-message-img");for(let e of t)if(e.complete){S(e),C();for(let e=1;e<11;e++)setTimeout(()=>C(),100*e)}else e.addEventListener("load",()=>{C();for(let e=1;e<11;e++)setTimeout(()=>C(),100*e);S(e)})}}),(e.target.classList.contains("is_DialogContent")||e.target.closest(".is_DialogContent"))&&!e.target.closest(".rcw-widget-container")&&k(window.innerWidth,window.innerHeight)})}),t=document.querySelector("body");return t&&e.observe(t,{childList:!0,subtree:!0}),()=>{e.disconnect()}},[]);let F=async()=>{console.log("requesting: ","/adminapi/v1/resources?search=tags:"+t.join(","));let e=await l.bl.get("/adminapi/v1/resources?search=tags:"+t.join(","));if(e.isLoaded&&e.data.items&&e.data.items.length){let t=e.data.items.map(async e=>{if("text"==e.type){let t=await l.bl.get(e.url,void 0,!0);return t.data}if("youtube"==e.type){let t=e.url.split("=");if(t.length<2)return null;let n=t[1];return"[![video](https://img.youtube.com/vi/"+n+"/0.jpg)]("+e.url+' "Video Title")\n'+e.description}return null}),n=await Promise.all(t);return n.filter(e=>null!==e)}return[]},A=async()=>{let e=await F();if(e.forEach(e=>(0,o.addResponseMessage)(e)),!v){let e="I'm here to help you. Feel free to ask questions about the system.";(0,o.addResponseMessage)(e),j(e)}};(0,s.useEffect)(()=>{k(window.innerWidth,window.innerHeight)},[q,E]);let[N,$]=(0,s.useState)(),[P,D]=(0,s.useState)();(0,s.useEffect)(()=>{var e=document.createElement("input");e.type="file",e.accept="image/*",e.style.display="none",e.addEventListener("change",e=>{var t=e.target.files[0];if(t){let e=new FileReader;e.onload=e=>{$({content:e.target.result,filename:t.name})},e.readAsDataURL(t)}});var t=document.createElement("div");t.className="rcw-picker-icon-container",t.addEventListener("click",()=>{e.click()});let n=h.createRoot(t);n.render((0,i.jsx)(c.Z,{size:24,className:"rcw-picker-icon"}));var s=y.current.getElementsByClassName("rcw-picker-btn")[0];return s&&s.parentNode.replaceChild(t,s),()=>{n.unmount()}},[null==y?void 0:null===(O=y.current)||void 0===O?void 0:O.isOpen,P]);for(var O,R=0;R<20;R++)(0,d.KS)(()=>{k(window.innerWidth,window.innerHeight)},50*R);let[T]=(0,m.KO)(a.XD);return(0,i.jsx)(r.I,{children:(0,i.jsx)("div",{ref:y,onMouseDown:e=>e.preventDefault(),onClick:e=>e.preventDefault(),style:{transform:"none",zIndex:1e5,bottom:0,right:0,position:"fixed"},children:(0,i.jsx)("div",{style:{position:"absolute"},children:(0,i.jsx)(o.Widget,{title:"Assistant",launcher:e=>(0,i.jsx)(f.zx,{onPress:e,animation:"lazy",alignSelf:"flex-end",marginTop:"40px",hoverStyle:{backgroundColor:"$color7"},backgroundColor:"$color7",size:"$5",right:"$5",bottom:"$5",circular:!0,children:P?(0,i.jsx)(x.sL,{animation:"bouncy",enterStyle:{rotate:"-90deg"},children:(0,i.jsx)(p.Z,{size:"30px",fillOpacity:0,color:"white"})}):(0,i.jsx)(u.Z,{fillOpacity:0,color:"white"})}),subtitle:"Get help, ideas and documentation",handleNewUserMessage:async e=>{console.log("Prompt chain: ",T);let t=e.startsWith("/"),n=e.startsWith("/help"),i=!!(t&&(null==N?void 0:N.content)),s=T.reduce((t,i)=>t+(n?i.generateCommand(e,t):i.generate(e,t,null==N?void 0:N.content)),"")+(n?"\n                                    ]\n\n                                    End of command list.\n\n                                    The user wants to know the list of available commands. Include all the commands in the reply, and include a small description of the command. use the field action for the description of what the command does, but summarize it. \n                                    ":t?"\n\n                                    ------\n                                    request: ".concat(e.replace(/^\/\S+/,"").trim()):'\n                                    reply directly to the user, acting as the assistant.\n\n                                    The question of the user for the assistant is:\n                                    "'.concat(e,'".'));i&&(s=[{type:"image_url",image_url:N.content},s]),console.log("prompt: ",s),(0,o.toggleMsgLoader)();let a=await l.bl.post("/adminapi/v1/assistants",{messages:[{role:"user",content:s}],best_of:4,temperature:n?0:1,gptModel:i?"gpt-4-vision-preview":void 0});if((0,o.toggleMsgLoader)(),console.log("result: ",a),a.isError)(0,o.addResponseMessage)("Error generating response: ",a.error);else if(a.data.error){var r=a.data.error.message;"invalid_api_key"==a.data.error.code&&(r+='\nPlease add your key on ".env": \nOPENAI_API_KEY={YOUR KEY HERE}'),(0,o.addResponseMessage)(r)}else(0,o.addResponseMessage)(a.data.choices[0].message.content),j(a.data.choices[0].message.content),$(void 0)},handleToggle:async e=>{e&&b&&(w(!1),(0,o.toggleMsgLoader)(),await A(),(0,o.toggleMsgLoader)()),D(e)},handleLauncher:!0})})})})}},50117:function(e,t,n){"use strict";n.d(t,{f:function(){return u}});var i=n(52322),s=n(61773),o=n(39006),a=n(2784),l=n(8939),r=n(17231),d=n(66306),c=n(53184);let p=e=>navigator.clipboard.writeText(e),u=a.forwardRef((e,t)=>{let{text:n,tooltipCopy:u="Copy to clipboard",tooltipCopied:h="Copied",...m}=e,{onCopy:f,hasCopied:x}=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1500,[n,i]=(0,a.useState)(!1),s=(0,c.z)(async()=>{await p(e),i(!0)});return(0,a.useEffect)(()=>{if(!n)return;let e=setTimeout(()=>{i(!1)},t);return()=>clearTimeout(e)},[t,n]),{value:e,onCopy:s,hasCopied:n}}(n);return(0,i.jsxs)(l.sL,{ref:t,borderWidth:1,borderColor:"$borderColor",px:"$7",pl:"$6",height:48,ai:"center",als:"center",elevation:"$3",bc:"$background",br:"$10",...m,children:[(0,i.jsx)("p",{className:"  is_Paragraph _col-675002279 _dsp-inline _bxs-border-box _ww-break-word _mt-0px _mr-0px _mb-0px _ml-0px _ff-299667014 _ussel-auto _ta-center _fow-233016171 _ls-167744090 _fos-229441251 _lh-222976604 _transform-1529269363 font_mono  _col-_sm_675002279 _ff-_sm_299667014 _fow-_sm_233016109 _ls-_sm_167744028 _fos-_sm_229441189 _lh-_sm_222976542",children:n}),(0,i.jsx)("span",{className:"  is_Spacer _ai-stretch _dsp-flex _fd-column _fb-auto _bxs-border-box _pos-relative _mih-1316330269 _miw-1316330269 _fs-0 _pe-none _w-1316330269 _h-1316330269 "}),(0,i.jsx)(r.w,{label:x?h:u,children:(0,i.jsx)(d.zx,{accessibilityLabel:n,size:"$3",borderRadius:"$8",mr:"$-6",x:-1,icon:x?s.J:o.C,onPress:f})})]})});n(80917)},80917:function(){},72841:function(){},62880:function(){}}]);