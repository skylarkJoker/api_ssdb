(this.webpackJsonpreact_ssdb=this.webpackJsonpreact_ssdb||[]).push([[0],{18:function(e,t,a){e.exports=a.p+"static/media/file.c1ed482c.svg"},27:function(e,t,a){e.exports=a.p+"static/media/ssdb.be6e6a3a.svg"},28:function(e,t,a){e.exports=a.p+"static/media/menu.24e6ce03.svg"},29:function(e,t,a){e.exports=a.p+"static/media/back_white.fbff8f05.svg"},30:function(e,t,a){e.exports=a.p+"static/media/back.48ca8b50.svg"},34:function(e,t,a){e.exports=a(47)},39:function(e,t,a){},40:function(e,t,a){},47:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),l=a(25),r=a.n(l),c=(a(39),a(23)),i=(a(40),a(10)),m=a(4),o=a(5),d=a(7),u=a(6),p=a(8),h=a(26),b=a(27),f=a.n(b),E=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){var t;a.setState((t={},Object(i.a)(t,e.target.name,e.target.value),Object(i.a)(t,"err",!1),t))},a.handleSubmit=function(e){Object(h.a)("/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a.state),credentials:"include"}).then((function(e){200===e.status?a.props.history.push("/classinfo"):422===e.status&&a.setState({err:!0})})),e.preventDefault()},a.state={username:"",password:"",err:!1},a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"login-page container"},s.a.createElement("form",{className:"form-grid"},s.a.createElement("img",{className:"logo",src:f.a,alt:"ssdb logo"}),s.a.createElement("div",{className:"floating-label-wrapper"},this.state.err?s.a.createElement("span",{className:"error"},"Incorrect username or password"):null,s.a.createElement("input",{onChange:this.handleChange,name:"username",className:"floating-label-field",placeholder:"Username",type:"text"}),s.a.createElement("label",{htmlFor:"username",className:"floating-label"},"Username")),s.a.createElement("div",{className:"floating-label-wrapper"},s.a.createElement("input",{onChange:this.handleChange,name:"password",className:"floating-label-field",placeholder:"Password",type:"password"}),s.a.createElement("label",{htmlFor:"password",className:"floating-label"},"Password")),s.a.createElement("button",{onClick:this.handleSubmit,className:"button button-large",type:"submit"},"Login")))}}]),t}(s.a.Component),g=a(28),N=a.n(g),v=a(29),y=a.n(v),C=a(30),S=a.n(C),w=a(2),O=function(e){return s.a.createElement("div",{className:"nav expand"},"menu"===e.dest?s.a.createElement("ul",null,s.a.createElement("li",null,s.a.createElement("img",{className:"menu",src:N.a,alt:""}),s.a.createElement("ul",{className:"dropdown"},s.a.createElement("li",null,s.a.createElement("button",{onClick:e.logout},"LOGOUT"))))):s.a.createElement(w.b,{to:e.dest},s.a.createElement("img",{className:"menu",src:"white"===e.color?y.a:S.a,alt:""})),e.edit?s.a.createElement(w.b,{to:e.edit},s.a.createElement("span",{className:"item-name light-font"},"edit")):null)},x=function(e){return s.a.createElement("div",{className:"container"},s.a.createElement(O,{dest:"/classinfo",edit:""}),s.a.createElement("div",{className:"attendance-grid"},s.a.createElement("div",{className:"attendance-head expand"},s.a.createElement("p",{className:"title"},"Attendance"),s.a.createElement("p",{className:"item-name"},"Highlight the members who are present")),s.a.createElement("div",{className:"expand"},s.a.createElement("ul",null,e.members?e.members.filter((function(e){return"missing_accounted"!==e.status})).map((function(t){var a="";return a=t.first_name?t.first_name.substring(0,1)+t.last_name.substring(0,1):"AA",s.a.createElement("li",{key:t.id,className:e.active.includes(t.id)?"selected list-item attendance":"list-item attendance",onClick:e.toggleAttendance.bind(void 0,t.id)},s.a.createElement("div",{className:"list-item-initials"},s.a.createElement("span",null,a)),s.a.createElement("span",{className:"item-name"},t.first_name," ",t.last_name),s.a.createElement("span",{className:"item-info"},t.address))})):null)),s.a.createElement("button",{className:"next button",onClick:e.nextStep},"NEXT")))},_=function(e){return s.a.createElement("div",{className:"container"},s.a.createElement(O,{dest:"/classinfo",edit:""}),s.a.createElement("div",{className:"attendance-grid"},s.a.createElement("div",{className:"attendance-head expand"},s.a.createElement("p",{className:"title"},"Missing"),s.a.createElement("p",{className:"item-name"},"Highlight the members who are accounted for")),s.a.createElement("div",{className:"expand"},s.a.createElement("ul",null,e.members.filter((function(e){return"present"!==e.status})).map((function(t){var a="";return a=t.first_name?t.first_name.substring(0,1)+t.last_name.substring(0,1):"AA",s.a.createElement("li",{key:t.id,className:e.active.includes(t.id)?"missing-selected list-item missing":"list-item missing",onClick:e.toggleMssnAccounted.bind(void 0,t.id)},s.a.createElement("div",{className:"list-item-initials"},s.a.createElement("span",null,a)),s.a.createElement("span",{className:"item-name"},t.first_name," ",t.last_name),s.a.createElement("span",{className:"item-info"},t.address))})))),s.a.createElement("button",{className:"prev button",onClick:e.prevStep},"PREV"),s.a.createElement("button",{className:"next button",onClick:e.nextStep},"NEXT")))},j=function(e){return s.a.createElement("div",{className:"container"},s.a.createElement(O,{dest:"/classinfo",edit:""}),s.a.createElement("div",{className:"attendance-grid"},s.a.createElement("div",{className:"attendance-head expand"},s.a.createElement("p",{className:"title"},"Study"),s.a.createElement("p",{className:"item-name"},"Highlight the members who studied")),s.a.createElement("div",{className:"expand"},s.a.createElement("ul",null,e.members.filter((function(e){return"present"===e.status})).map((function(t){var a="";return a=t.first_name?t.first_name.substring(0,1)+t.last_name.substring(0,1):"AA",s.a.createElement("li",{key:t.id,className:e.active.includes(t.id)?"study-selected list-item study":"list-item study",onClick:e.toggleStudied.bind(void 0,t.id)},s.a.createElement("div",{className:"list-item-initials"},s.a.createElement("span",null,a)),s.a.createElement("span",{className:"item-name"},t.first_name," ",t.last_name),s.a.createElement("span",{className:"item-info"},t.address))})))),s.a.createElement("button",{className:"prev button",onClick:e.prevStep},"prev"),s.a.createElement("button",{className:"next button",onClick:e.nextStep},"next")))},k=function(e){return s.a.createElement("div",{className:"container"},s.a.createElement(O,{dest:"/classinfo",edit:""}),s.a.createElement("div",{className:"attendance-grid"},s.a.createElement("div",{className:"attendance-head expand"},s.a.createElement("p",{className:"title"},"Baptisms"),s.a.createElement("p",{className:"item-name"},"Enter the number of baptisms this week.")),s.a.createElement("div",{className:"expand"},s.a.createElement("input",{name:"saved",type:"text",onChange:e.handleChange})),s.a.createElement("button",{className:"prev button",onClick:e.prevStep},"PREV"),s.a.createElement("button",{className:"next button",onClick:e.done},"DONE")))},A=function(e){e.handleClose;var t=e.show,a=e.children,n=t?"modal display-block":"modal display-none";return s.a.createElement("div",{className:n},s.a.createElement("section",{className:"modal-main"},a))},T=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(a=Object(d.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={step:1,attn:[],mssn:[],stdy:[],saved:0,overwrite:!1,members:[{id:"1",name:"Andrew Aardvark",address:"Vernon's Estate",status:"absent",studied:0},{id:"2",name:"Brandon Marks",address:"Vernon's Estate",status:"absent",studied:0},{id:"3",name:"Charles King",address:"Vernon's Estate",status:"absent",studied:0}],show:!1},a.loadData=function(){fetch("/class/members",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include"}).then((function(e){return e.json()})).then((function(e){e.forEach((function(e){e.status="absent",e.studied=0})),a.setState({members:e}),console.log(a.state.members)}))},a.componentDidMount=function(){fetch("/class/checkattendance").then((function(e){return e.json()})).then((function(e){e.length>0?a.setState({show:!0}):a.loadData()})),a.loadData()},a.setOverwrite=function(){a.setState({overwrite:!0,show:!1})},a.cancel=function(){a.setState({show:!1},(function(){a.props.history.push("/classinfo")}))},a.handleChange=function(e){a.setState(Object(i.a)({},e.target.name,e.target.value))},a.toggleAttendance=function(e){var t=a.state.members,n=a.state.attn;n.includes(e)?n.splice(n.indexOf(e),1):n.push(e),t.forEach((function(t){t.id===e&&("absent"===t.status?t.status="present":t.status="absent")})),a.setState({members:t,attn:n})},a.toggleMssnAccounted=function(e){var t=a.state.members,n=a.state.mssn;n.includes(e)?n.splice(n.indexOf(e),1):n.push(e),t.forEach((function(t){t.id===e&&("absent"===t.status?t.status="missing_accounted":t.status="absent")})),a.setState({members:t,mssn:n})},a.toggleStudied=function(e){var t=a.state.members,n=a.state.stdy;n.includes(e)?n.splice(n.indexOf(e),1):n.push(e),t.forEach((function(t){t.id===e&&(0===t.studied?t.studied=1:t.studied=0)})),a.setState({members:t,stdy:n})},a.handleSubmit=function(e){e.preventDefault(),fetch("/class/addrecords",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({members:a.state.members,saved:a.state.saved,overwrite:a.state.overwrite}),credentials:"include"}).then((function(){a.props.history.push("/classinfo"),console.log("sent")})),console.log("stuff")},a.nextStep=function(){var e=a.state.step;a.setState({step:e+1})},a.prevStep=function(){var e=a.state.step;a.setState({step:e-1})},a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){switch(this.state.step){case 1:return s.a.createElement("div",null,s.a.createElement(x,{active:this.state.attn,members:this.state.members,toggleAttendance:this.toggleAttendance,nextStep:this.nextStep}),s.a.createElement(A,{show:this.state.show},s.a.createElement("div",{className:"modal-grid"},s.a.createElement("p",{className:"expand"},"Attendance already recorded today, do you want to overwrite?"),s.a.createElement("button",{className:"button button-small",onClick:this.setOverwrite},"YES"),s.a.createElement("button",{className:"button button-small",onClick:this.cancel},"NO"))));case 2:return s.a.createElement(_,{active:this.state.mssn,toggleMssnAccounted:this.toggleMssnAccounted,members:this.state.members,nextStep:this.nextStep,prevStep:this.prevStep});case 3:return s.a.createElement(j,{active:this.state.stdy,toggleStudied:this.toggleStudied,members:this.state.members,done:this.handleSubmit,nextStep:this.nextStep,prevStep:this.prevStep});case 4:return s.a.createElement(k,{handleChange:this.handleChange,active:this.state.stdy,done:this.handleSubmit,members:this.state.members,prevStep:this.prevStep});default:return s.a.createElement(x,{nextStep:this.nextStep})}}}]),t}(s.a.Component),M=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){var t="checkbox"===e.target.type?e.target.checked:e.target.value;a.setState(Object(i.a)({},e.target.name,t))},a.handleSubmit=function(e){""===a.state.first_name||""===a.state.last_name||""===a.state.address||""===a.state.phone_home?a.setState({error:!0}):a.state.isGuest?fetch("/members/createguest",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({guest:a.state}),credentials:"include"}).then((function(e){return e.text()})).then((function(e){console.log(e),a.props.history.push("/classinfo")})):fetch("/members/create",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({member:a.state}),credentials:"include"}).then((function(e){return e.text()})).then((function(e){console.log(e),a.props.history.push("/classinfo")})),e.preventDefault()},a.state={first_name:"",last_name:"",address:"",phone:"",email:"",isGuest:!1,error:!1},a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"container form-page"},s.a.createElement(O,{dest:"/classinfo",edit:""}),s.a.createElement("p",{className:"title"},"Add a new member"),this.state.error?s.a.createElement("p",{className:"error"},"Please fill out the required fields."):null,s.a.createElement("form",{className:"form-grid"},s.a.createElement("div",{className:"floating-label-wrapper"},s.a.createElement("input",{name:"first_name",onChange:this.handleChange,placeholder:"First Name",type:"text",className:"floating-label-field"}),s.a.createElement("label",{htmlFor:"first_name",className:"floating-label"},"First Name")),s.a.createElement("div",{className:"floating-label-wrapper"},s.a.createElement("input",{name:"last_name",onChange:this.handleChange,placeholder:"Last Name",type:"text",className:"floating-label-field"}),s.a.createElement("label",{htmlFor:"last_name",className:"floating-label"},"Last Name")),s.a.createElement("div",{className:"floating-label-wrapper"},s.a.createElement("input",{name:"address",onChange:this.handleChange,placeholder:"Address",type:"text",className:"floating-label-field"}),s.a.createElement("label",{htmlFor:"address",className:"floating-label"},"Address")),s.a.createElement("div",{className:"floating-label-wrapper"},s.a.createElement("input",{name:"phone",onChange:this.handleChange,placeholder:"phone",type:"text",className:"floating-label-field"}),s.a.createElement("label",{htmlFor:"phone",className:"floating-label"},"Phone")),s.a.createElement("div",{className:"floating-label-wrapper"},s.a.createElement("input",{name:"email",onChange:this.handleChange,placeholder:"Email",type:"email",className:"floating-label-field"}),s.a.createElement("label",{htmlFor:"email",className:"floating-label"},"Email")),s.a.createElement("div",null,s.a.createElement("label",null,s.a.createElement("input",{type:"checkbox",checked:this.state.isGuest,onChange:this.handleChange,name:"isGuest"}),"Guest")),s.a.createElement(w.b,{to:"/addexisting"},s.a.createElement("button",{className:"button button-large"},"add existing member")),s.a.createElement("button",{className:"button button-large",onClick:this.handleSubmit},"submit")))}}]),t}(s.a.Component),L=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(u.a)(t).call(this,e))).handleSubmit=function(e){e.preventDefault(),console.log(a.state.active.length),a.state.active.length<=0?alert("Please select at least one memeber"):fetch("/class/membership",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({members:a.state.active}),credentials:"include"}).then((function(){a.props.history.push("/classinfo")}))},a.handleChange=function(e){a.setState(Object(i.a)({},e.target.name,e.target.value))},a.toggleAdd=function(e){var t=a.state.active;t.includes(e)?t.splice(t.indexOf(e),1):t.push(e),a.setState({active:t})},a.componentDidMount=function(){fetch("/class/noclass",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include"}).then((function(e){return e.json()})).then((function(e){a.setState({members:e.Members})}))},a.state={members:[],active:[],filter:"",error:!1},a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.state.filter;return s.a.createElement("div",{className:"container"},s.a.createElement(O,{dest:"/classinfo"}),s.a.createElement("div",{className:"attendance-grid"},s.a.createElement("div",{className:"attendance-head add-existing expand"},s.a.createElement("p",{className:"title"},"Existing members"),s.a.createElement("p",{className:"item-name"},"Highlight members to be added"),s.a.createElement("input",{type:"text",name:"filter",placeholder:"Search...",className:"text-input",onChange:this.handleChange})),s.a.createElement("div",{className:"expand"},s.a.createElement("ul",null,this.state.members?this.state.members.filter((function(e){return e.first_name.toLowerCase().includes(t.toLowerCase())||e.last_name.toLowerCase().includes(t.toLowerCase())||e.address.toLowerCase().includes(t.toLowerCase())?e:null})).map((function(t){var a="";return a=t.first_name?t.first_name.toLowerCase().substring(0,1)+t.last_name.toLowerCase().substring(0,1):"AA",s.a.createElement("li",{key:t.id,className:e.state.active.includes(t.id)?"selected list-item attendance":"list-item attendance",onClick:e.toggleAdd.bind(e,t.id)},s.a.createElement("div",{className:"list-item-initials"},s.a.createElement("span",null,a)),s.a.createElement("span",{className:"item-name"},t.first_name," ",t.last_name),s.a.createElement("span",{className:"item-info"},t.address))})):null)),s.a.createElement("button",{className:"button button-large expand",onClick:this.handleSubmit},"submit")))}}]),t}(s.a.Component),D=a(18),P=a.n(D),F=a(16),J=(a(46),function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(u.a)(t).call(this,e))).logout=function(){fetch("/auth/logout").then((function(){a.props.history.push("/")}))},a.componentDidMount=function(){fetch("/class/myclassinfo",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include"}).then((function(e){return e.json()})).then((function(e){a.setState({classinfo:e})}))},a.handleChange=function(e){a.setState(Object(i.a)({},e.target.name,e.target.value))},a.state={classinfo:{name:"",division:"",Teacher:{},Secretary:{},Care_Coordinator:{},Members:[],Guests:[]},filter:""},a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.state,t=e.classinfo,a=e.filter;return s.a.createElement("div",{className:"container profile-page"},s.a.createElement("div",{className:"class-info"},s.a.createElement(O,{dest:"menu",logout:this.logout}),s.a.createElement("div",{className:" page-head"},s.a.createElement("div",{className:"letter expand"},s.a.createElement("span",null," ",t.name.substring(0,1).toUpperCase()," ")),s.a.createElement("div",{className:"expand"},s.a.createElement("p",{className:"title"}," Class ",t.name," "),s.a.createElement("p",{className:"item-info"},t.division," division |"," ",s.a.createElement("span",null," ",t.Members.length," ")," members")),s.a.createElement("div",{className:"leader"},s.a.createElement("p",{className:"item-name"},t.Teacher.first_name," ",t.Teacher.last_name),s.a.createElement("p",{className:"item-info"}," Teacher ")),s.a.createElement("div",{className:"leader"},s.a.createElement("p",{className:"item-name"},t.Secretary.first_name," ",t.Secretary.last_name),s.a.createElement("p",{className:"item-info"}," Secretary ")),s.a.createElement("div",{className:"leader"},s.a.createElement("p",{className:"item-name"},t.Care_Coordinator.first_name," ",t.Care_Coordinator.last_name),s.a.createElement("p",{className:"item-info"}," Care Coordinator ")),s.a.createElement(w.b,{to:"/addmember"},s.a.createElement("button",{className:"button-inverse button-small"},"add member")),s.a.createElement(w.b,{to:"/report"},s.a.createElement("button",{className:"button-inverse button-small"}," report ")),s.a.createElement(w.b,{to:"/mark"},s.a.createElement("button",{className:"button-inverse button-small"},"attendance")),s.a.createElement("span",{className:"splash"}," class "))),s.a.createElement("div",{className:"item-list"},s.a.createElement("input",{className:"search",type:"text",name:"filter",placeholder:"Search...",onChange:this.handleChange}),s.a.createElement(F.d,null,s.a.createElement(F.b,null,s.a.createElement(F.a,null,"Members"),s.a.createElement(F.a,null,"Guests")),s.a.createElement(F.c,null,t.Members.length>0?s.a.createElement("ul",null,t.Members.filter((function(e){return e.first_name.toLowerCase().includes(a.toLowerCase())||e.last_name.toLowerCase().includes(a.toLowerCase())||e.address.toLowerCase().includes(a.toLowerCase())?e:null})).map((function(e){var t="";return t=e.first_name?e.first_name.substring(0,1)+e.last_name.substring(0,1):"AA",s.a.createElement(w.b,{key:e.id,to:"/member/".concat(e.id)},s.a.createElement("li",{className:"list-item"},s.a.createElement("div",{className:"list-item-initials"},s.a.createElement("span",null," ",t.toLowerCase()," ")),s.a.createElement("span",{className:"list-item-name"},e.first_name," ",e.last_name),s.a.createElement("span",{className:"list-item-info"},e.address)))}))):s.a.createElement("div",{className:"empty-list"},s.a.createElement("img",{src:P.a,alt:"empty list"}),s.a.createElement("p",null," No members... "))),s.a.createElement(F.c,null,t.Guests.length>0?s.a.createElement("ul",null,t.Guests.filter((function(e){return e.first_name.toLowerCase().includes(a.toLowerCase())||e.last_name.toLowerCase().includes(a.toLowerCase())||e.address.toLowerCase().includes(a.toLowerCase())?e:null})).map((function(e){var t="";return t=e.first_name?e.first_name.substring(0,1)+e.last_name.substring(0,1):"AA",s.a.createElement(w.b,{key:e.id,to:"/guest/".concat(e.id)},s.a.createElement("li",{className:"list-item"},s.a.createElement("div",{className:"list-item-initials"},s.a.createElement("span",null," ",t.toLowerCase()," ")),s.a.createElement("span",{className:"list-item-name"},e.first_name," ",e.last_name),s.a.createElement("span",{className:"list-item-info"},e.address)))}))):s.a.createElement("div",{className:"empty-list"},s.a.createElement("img",{src:P.a,alt:"empty list"}),s.a.createElement("p",null," No guests... "))))))}}]),t}(s.a.Component)),G=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(u.a)(t).call(this,e))).showModal=function(){a.setState({show:!0})},a.hideModal=function(){a.setState({show:!1,err:!1})},a.componentDidMount=function(){var e="/members/read";a.props.match.path.includes("guest")&&(e="/guests/read",a.setState({guest:!0})),fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:a.props.match.params.id}),credentials:"include"}).then((function(e){return e.json()})).then((function(e){console.log(e),a.setState({memberinfo:e})}))},a.remove=function(){fetch("/members/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:a.props.match.params.id}),credentials:"include"}).then((function(e){200===e.status?a.props.history.push("/classinfo"):422===e.status&&a.setState({err:!0})}))},a.getMonth=function(e){switch(e){case 0:return"January";case 1:return"February";case 2:return"March";case 3:return"April";case 4:return"May";case 5:return"June";case 6:return"July";case 7:return"August";case 8:return"September";case 9:return"October";case 10:return"November";case 11:return"December";default:return"Month"}},a.getDay=function(e){switch(e){case 0:return"Sunday";case 1:return"Monday";case 2:return"Tuesday";case 3:return"Wednesday";case 4:return"Thursday";case 5:return"Friday";case 6:return"Saturday";default:return"Day"}},a.state={memberinfo:{first_name:"Andrew",last_name:"Aardvark",address:"Vernon's Estate",phone_home:"(268)000-0000",email:"aardark@nothing.com",Attendances:[]},show:!1,err:!1,guest:!1},a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.state.memberinfo;return s.a.createElement("div",{className:"member container profile-page"},s.a.createElement("div",{className:"member-head"},s.a.createElement(O,{dest:"/classinfo",color:"white"}),s.a.createElement("div",{className:"page-head"},s.a.createElement("div",{className:"letter expand"},s.a.createElement("span",null,t.first_name.substring(0,1))),s.a.createElement("p",{className:"item-name expand"},t.first_name," ",t.last_name),s.a.createElement("p",{className:"item-info expand"},t.address,s.a.createElement("br",null),"Phone: ",t.phone," Email: ",t.email),s.a.createElement("span",{className:"splash"},"member"))),s.a.createElement("div",{className:"item-list"},s.a.createElement("p",{className:"sub-title"},"Attendance"),t.Attendances.length>0?s.a.createElement("ul",{className:"record-list"},t.Attendances.map((function(t){var a=new Date(t.createdAt),n=e.getDay(a.getDay()),l=e.getMonth(a.getMonth()),r=a.getFullYear();return s.a.createElement("li",{key:t.id,className:t.study?"list-item study-selected":"list-item"},s.a.createElement("span",{className:"date expand"},n," ",a.getDate(),", ",l," ",r),s.a.createElement("span",{className:"did-study expand"},t.status))}))):s.a.createElement("div",{className:"empty-list"},s.a.createElement("img",{src:P.a,alt:"empty list"}),s.a.createElement("p",null,"No records..."))),this.state.guest?null:s.a.createElement("button",{className:"button button-large error",onClick:this.showModal},"REMOVE"),s.a.createElement(A,{show:this.state.show},s.a.createElement("div",{className:"modal-grid"},s.a.createElement("p",{className:"expand"},"Are you sure you want to remove this member from this class?"),s.a.createElement("button",{className:"button button-small",onClick:this.remove},"YES"),s.a.createElement("button",{className:"button button-small",onClick:this.hideModal},"NO"))),s.a.createElement(A,{show:this.state.err},s.a.createElement("div",{className:"modal-grid"},s.a.createElement("p",{className:"expand"},"Cannot remove while logged in..."),s.a.createElement("button",{className:"button button-small",onClick:this.hideModal},"OK"))))}}]),t}(s.a.Component),V=a(14),H=new(a(33).a),U=function(e){var t=e.component,a=Object(c.a)(e,["component"]);return s.a.createElement(V.b,Object.assign({},a,{render:function(e){return H.get("blitz")?s.a.createElement(V.a,{to:{pathname:"/classinfo",state:{from:e.location}}}):s.a.createElement(t,e)}}))},B=function(e){var t=e.component,a=Object(c.a)(e,["component"]);return s.a.createElement(V.b,Object.assign({},a,{render:function(e){return H.get("blitz")?s.a.createElement(t,e):s.a.createElement(V.a,{to:{pathname:"/login",state:{from:e.location}}})}}))},R=function(){return s.a.createElement("p",null,"There doesn't seem to be anything here...")};var Y=function(){return s.a.createElement(w.a,null,s.a.createElement(V.d,null,s.a.createElement(U,{path:"/login",component:E}),s.a.createElement(B,{exact:!0,path:"/",component:J}),s.a.createElement(B,{path:"/classinfo",component:J}),s.a.createElement(B,{path:"/mark",component:T}),s.a.createElement(B,{path:"/member/:id",component:G}),s.a.createElement(B,{path:"/guest/:id",component:G}),s.a.createElement(B,{path:"/addmember",component:M}),s.a.createElement(B,{path:"/addexisting",component:L}),s.a.createElement(B,{component:R})))};r.a.render(s.a.createElement(Y,null),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.4318e160.chunk.js.map