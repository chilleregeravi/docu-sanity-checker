import{j as e,c as T,k as se,g as te,i as re,h as S,l as ne}from"./ui-B6EZjMy9.js";import{r as l}from"./vendor-CYhCygfF.js";import{f as m,B as R,R as ae,h as A,i as oe,j as ie,I as le,C as ce,k as de,P as ue}from"./main-BZX9DJ1o.js";import{u as me,M as xe,C as he}from"./MarkdownRenderer-BWNK_1R-.js";var fe="Separator",M="horizontal",pe=["horizontal","vertical"],$=l.forwardRef((t,r)=>{const{decorative:s,orientation:n=M,...i}=t,a=ge(n)?n:M,c=s?{role:"none"}:{"aria-orientation":a==="vertical"?a:void 0,role:"separator"};return e.jsx(T.div,{"data-orientation":a,...c,...i,ref:r})});$.displayName=fe;function ge(t){return pe.includes(t)}var F=$;const P=l.forwardRef(({className:t,orientation:r="horizontal",decorative:s=!0,...n},i)=>e.jsx(F,{ref:i,decorative:s,orientation:r,className:m("shrink-0 bg-border",r==="horizontal"?"h-[1px] w-full":"h-full w-[1px]",t),...n}));P.displayName=F.displayName;const j=l.forwardRef(({className:t,...r},s)=>e.jsx("textarea",{className:m("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",t),ref:s,...r}));j.displayName="Textarea";const f=l.forwardRef(({className:t,...r},s)=>e.jsx("div",{ref:s,className:m("rounded-lg border bg-card text-card-foreground shadow-sm",t),...r}));f.displayName="Card";const p=l.forwardRef(({className:t,...r},s)=>e.jsx("div",{ref:s,className:m("flex flex-col space-y-1.5 p-6",t),...r}));p.displayName="CardHeader";const g=l.forwardRef(({className:t,...r},s)=>e.jsx("h3",{ref:s,className:m("text-2xl font-semibold leading-none tracking-tight",t),...r}));g.displayName="CardTitle";const b=l.forwardRef(({className:t,...r},s)=>e.jsx("p",{ref:s,className:m("text-sm text-muted-foreground",t),...r}));b.displayName="CardDescription";const v=l.forwardRef(({className:t,...r},s)=>e.jsx("div",{ref:s,className:m("p-6 pt-0",t),...r}));v.displayName="CardContent";const N=l.forwardRef(({className:t,...r},s)=>e.jsx("div",{ref:s,className:m("flex items-center p-6 pt-0",t),...r}));N.displayName="CardFooter";const ve=({input:t,setInput:r,isGenerating:s,onGenerate:n})=>e.jsxs(f,{children:[e.jsxs(p,{children:[e.jsx(g,{children:"Input Content"}),e.jsx(b,{children:"Enter your original content below"})]}),e.jsx(v,{children:e.jsx(j,{value:t,onChange:i=>r(i.target.value),placeholder:"Enter your technical documentation here. For example: 'It is necessary for users to install the software prior to configuration.'",className:"min-h-[300px]"})}),e.jsx(N,{children:e.jsx(R,{onClick:n,disabled:s||!t.trim(),className:"w-full",children:s?e.jsxs(e.Fragment,{children:[e.jsx(ae,{className:"mr-2 h-4 w-4 animate-spin"}),"Converting..."]}):"Convert to Microsoft Style"})})]});var k="Tabs",[ye,Fe]=se(k,[A]),G=A(),[je,E]=ye(k),U=l.forwardRef((t,r)=>{const{__scopeTabs:s,value:n,onValueChange:i,defaultValue:a,orientation:o="horizontal",dir:c,activationMode:x="automatic",...h}=t,d=oe(c),[u,y]=te({prop:n,onChange:i,defaultProp:a});return e.jsx(je,{scope:s,baseId:re(),value:u,onValueChange:y,orientation:o,dir:d,activationMode:x,children:e.jsx(T.div,{dir:d,"data-orientation":o,...h,ref:r})})});U.displayName=k;var O="TabsList",_=l.forwardRef((t,r)=>{const{__scopeTabs:s,loop:n=!0,...i}=t,a=E(O,s),o=G(s);return e.jsx(ie,{asChild:!0,...o,orientation:a.orientation,dir:a.dir,loop:n,children:e.jsx(T.div,{role:"tablist","aria-orientation":a.orientation,...i,ref:r})})});_.displayName=O;var D="TabsTrigger",z=l.forwardRef((t,r)=>{const{__scopeTabs:s,value:n,disabled:i=!1,...a}=t,o=E(D,s),c=G(s),x=H(o.baseId,n),h=Y(o.baseId,n),d=n===o.value;return e.jsx(le,{asChild:!0,...c,focusable:!i,active:d,children:e.jsx(T.button,{type:"button",role:"tab","aria-selected":d,"aria-controls":h,"data-state":d?"active":"inactive","data-disabled":i?"":void 0,disabled:i,id:x,...a,ref:r,onMouseDown:S(t.onMouseDown,u=>{!i&&u.button===0&&u.ctrlKey===!1?o.onValueChange(n):u.preventDefault()}),onKeyDown:S(t.onKeyDown,u=>{[" ","Enter"].includes(u.key)&&o.onValueChange(n)}),onFocus:S(t.onFocus,()=>{const u=o.activationMode!=="manual";!d&&!i&&u&&o.onValueChange(n)})})})});z.displayName=D;var L="TabsContent",B=l.forwardRef((t,r)=>{const{__scopeTabs:s,value:n,forceMount:i,children:a,...o}=t,c=E(L,s),x=H(c.baseId,n),h=Y(c.baseId,n),d=n===c.value,u=l.useRef(d);return l.useEffect(()=>{const y=requestAnimationFrame(()=>u.current=!1);return()=>cancelAnimationFrame(y)},[]),e.jsx(ne,{present:i||d,children:({present:y})=>e.jsx(T.div,{"data-state":d?"active":"inactive","data-orientation":c.orientation,role:"tabpanel","aria-labelledby":x,hidden:!y,id:h,tabIndex:0,...o,ref:r,style:{...t.style,animationDuration:u.current?"0s":void 0},children:y&&a})})});B.displayName=L;function H(t,r){return`${t}-trigger-${r}`}function Y(t,r){return`${t}-content-${r}`}var be=U,K=_,q=z,W=B;const J=be,I=l.forwardRef(({className:t,...r},s)=>e.jsx(K,{ref:s,className:m("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",t),...r}));I.displayName=K.displayName;const w=l.forwardRef(({className:t,...r},s)=>e.jsx(q,{ref:s,className:m("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",t),...r}));w.displayName=q.displayName;const C=l.forwardRef(({className:t,...r},s)=>e.jsx(W,{ref:s,className:m("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",t),...r}));C.displayName=W.displayName;const Ne=({generatedContent:t})=>{const[r,s]=l.useState(!1),{toast:n}=me(),i=()=>{navigator.clipboard.writeText(t),s(!0),n({title:"Copied to clipboard",description:"The generated content has been copied to your clipboard."}),setTimeout(()=>s(!1),2e3)};return e.jsxs(f,{children:[e.jsxs(p,{children:[e.jsx(g,{children:"Generated Content"}),e.jsx(b,{children:"Microsoft Style Guide compliant output"})]}),e.jsx(v,{children:e.jsxs(J,{defaultValue:"preview",children:[e.jsxs(I,{className:"mb-4",children:[e.jsx(w,{value:"preview",children:"Preview"}),e.jsx(w,{value:"markdown",children:"Markdown"})]}),e.jsx(C,{value:"preview",className:"min-h-[300px] border rounded-md p-4",children:t?e.jsx(xe,{content:t}):e.jsx("div",{className:"text-muted-foreground text-center h-full flex items-center justify-center",children:"Generated content will appear here"})}),e.jsx(C,{value:"markdown",className:"min-h-[300px]",children:t?e.jsx(j,{value:t,readOnly:!0,className:"min-h-[300px] font-mono text-sm"}):e.jsx("div",{className:"text-muted-foreground text-center h-full flex items-center justify-center border rounded-md p-4",children:"Generated markdown will appear here"})})]})}),e.jsx(N,{children:e.jsx(R,{onClick:i,disabled:!t,variant:"outline",className:"w-full",children:r?e.jsxs(e.Fragment,{children:[e.jsx(ce,{className:"mr-2 h-4 w-4"}),"Copied!"]}):e.jsxs(e.Fragment,{children:[e.jsx(he,{className:"mr-2 h-4 w-4"}),"Copy to Clipboard"]})})})]})},we=de("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function V({className:t,variant:r,...s}){return e.jsx("div",{className:m(we({variant:r}),t),...s})}const Q=["is being","was","were","has been","have been","had been","will be","being","is used to","are required to","is done","are provided"],X=[{avoid:"utilize",use:"use",type:"grammar"},{avoid:"functionality",use:"features",type:"grammar"},{avoid:"leverage",use:"use",type:"grammar"},{avoid:"in order to",use:"to",type:"grammar"},{avoid:"ensure",use:"make sure",type:"grammar"},{avoid:"employ",use:"use",type:"grammar"},{avoid:"assistance",use:"help",type:"grammar"},{avoid:"initiate",use:"start",type:"grammar"}],Z=[{phrase:"please note",suggestion:"Remove 'please note' and state the information directly",type:"voice"},{phrase:"it is recommended",suggestion:"We recommend",type:"voice"},{phrase:"it is important to",suggestion:"You need to",type:"voice"},{phrase:"it should be noted",suggestion:"Note that",type:"voice"},{phrase:"please be advised",suggestion:"Remove this phrase entirely",type:"voice"},{phrase:"click on",suggestion:"select",type:"verb"},{phrase:"tap on",suggestion:"select",type:"verb"}],Ce=t=>{let r=t;return X.forEach(({avoid:s,use:n})=>{const i=new RegExp(`\\b${s}\\b`,"gi");r=r.replace(i,n)}),Q.forEach(s=>{const n=new RegExp(`\\b${s}\\b`,"gi");r=r.replace(n,i=>i+" [consider using active voice]")}),Z.forEach(({phrase:s,suggestion:n})=>{if(n.startsWith("Remove")){const i=new RegExp(`\\b${s}\\b`,"gi");r=r.replace(i,"")}else{const i=new RegExp(`\\b${s}\\b`,"gi");r=r.replace(i,n)}}),r},Te=(t,r)=>{const s=[],n=t.split(`
`);Q.forEach(a=>{n.forEach((o,c)=>{o.toLowerCase().includes(a.toLowerCase())&&s.push({type:"voice",pattern:a,suggestion:"Use active voice instead of passive voice",line:c+1,context:o})})}),X.forEach(({avoid:a,use:o,type:c})=>{const x=new RegExp(`\\b${a}\\b`,"gi");n.forEach((h,d)=>{x.test(h)&&s.push({type:c,pattern:a,suggestion:`Use "${o}" instead of "${a}"`,line:d+1,context:h})})}),Z.forEach(({phrase:a,suggestion:o,type:c})=>{const x=new RegExp(`\\b${a}\\b`,"gi");n.forEach((h,d)=>{x.test(h)&&s.push({type:c,pattern:a,suggestion:o,line:d+1,context:h})})});const i=Math.max(0,100-s.length*5);return{violations:s,score:i}},ee={select:"click, tap, press",configuration:"config, setup",documentation:"docs, papers",validate:"check, verify","style guide":"style rules, guidelines","Microsoft style":"MS style","GitHub Actions":"GH Actions, Actions",Markdown:"markup",frontmatter:"YAML header, metadata","CI/CD":"pipeline",linting:"checking",validator:"checker"},Re=t=>{const r=[];Object.entries(ee).forEach(([n,i])=>{i.split(",").map(o=>o.trim()).forEach(o=>{new RegExp(`\\b${o}\\b`,"gi").test(t)&&r.push(`Use "${n}" instead of "${o}"`)})});const s=r.length===0?100:Math.max(0,100-r.length*5);return{violations:r,score:s}},Se=t=>{const r=[{acronym:"CI/CD",fullForm:"Continuous Integration/Continuous Deployment"},{acronym:"API",fullForm:"Application Programming Interface"},{acronym:"UI",fullForm:"User Interface"},{acronym:"CLI",fullForm:"Command Line Interface"},{acronym:"PR",fullForm:"Pull Request"}],s=[];return r.forEach(({acronym:n,fullForm:i})=>{new RegExp(`\\b${n}\\b`,"g").test(t)&&(new RegExp(`${i}\\s+\\(${n}\\)`,"i").test(t)||s.push(`Acronym "${n}" is used without defining its full form "${i}" on first use.`))}),{violations:s}},ke=t=>{let r=t;return Object.entries(ee).forEach(([s,n])=>{n.split(",").map(a=>a.trim()).forEach(a=>{const o=new RegExp(`\\b${a}\\b`,"gi");r=r.replace(o,s)})}),r},Ee=()=>e.jsxs(f,{className:"mt-8",children:[e.jsx(p,{children:e.jsx(g,{children:"Microsoft Style Tips"})}),e.jsx(v,{children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"font-medium mb-2",children:"Core Principles"}),e.jsxs("ul",{className:"list-disc list-inside space-y-1",children:[e.jsx("li",{children:"Use active voice, not passive"}),e.jsx("li",{children:'Address the reader directly using "you"'}),e.jsx("li",{children:"Be concise and conversational"}),e.jsx("li",{children:"Use sentence-style capitalization in headings"}),e.jsx("li",{children:'Avoid using "please" in instructions'})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-medium mb-2",children:"Common Transformations"}),e.jsx("div",{className:"space-y-2",children:e.jsxs("div",{className:"grid grid-cols-2 gap-2 text-sm",children:[e.jsx("div",{className:"font-medium",children:"Instead of"}),e.jsx("div",{className:"font-medium",children:"Use"}),e.jsx("div",{className:"text-red-500",children:"It is necessary to configure..."}),e.jsx("div",{className:"text-green-500",children:"You need to configure..."}),e.jsx("div",{className:"text-red-500",children:"Users should be aware..."}),e.jsx("div",{className:"text-green-500",children:"You should be aware..."}),e.jsx("div",{className:"text-red-500",children:"Click on the button"}),e.jsx("div",{className:"text-green-500",children:"Select the button"})]})})]})]})})]}),Ie=()=>{const[t,r]=l.useState(""),[s,n]=l.useState(null),i=()=>{if(!t.trim())return;const a=Te(t),o=Re(t),c=Se(t),x=ke(t);n({styleViolations:a.violations,termViolations:o.violations,acronymViolations:c.violations,styleScore:a.score,termScore:o.score,improvedText:x})};return e.jsxs("div",{className:"space-y-6",children:[e.jsxs(f,{children:[e.jsxs(p,{children:[e.jsx(g,{children:"Microsoft Style Checker"}),e.jsx(b,{children:"Enter your text below to check for compliance with the Microsoft Manual of Style"})]}),e.jsx(v,{children:e.jsx(j,{value:t,onChange:a=>r(a.target.value),placeholder:"Enter your documentation text here...",rows:10,className:"w-full font-mono text-sm"})}),e.jsx(N,{children:e.jsx(R,{onClick:i,disabled:!t.trim(),children:"Check Style"})})]}),s&&e.jsxs(e.Fragment,{children:[e.jsxs(f,{children:[e.jsx(p,{children:e.jsxs(g,{className:"flex items-center justify-between",children:["Results",e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(V,{variant:s.styleScore>=90?"default":s.styleScore>=70?"secondary":"destructive",children:["Style: ",s.styleScore,"/100"]}),e.jsxs(V,{variant:s.termScore>=90?"default":s.termScore>=70?"secondary":"destructive",children:["Terminology: ",s.termScore,"/100"]})]})]})}),e.jsxs(v,{className:"space-y-4",children:[s.styleViolations.length>0&&e.jsxs("div",{children:[e.jsxs("h3",{className:"text-lg font-medium mb-2",children:["Style Violations (",s.styleViolations.length,")"]}),e.jsx("ul",{className:"list-disc list-inside space-y-2",children:s.styleViolations.map((a,o)=>e.jsxs("li",{className:"text-sm",children:[e.jsx("span",{className:"font-medium",children:a.pattern}),e.jsxs("div",{className:"ml-6 mt-1",children:[e.jsxs("span",{className:"text-red-500",children:['Found in: "',a.context,'"']}),e.jsx("br",{}),e.jsxs("span",{className:"text-green-500",children:['Suggestion: "',a.suggestion,'"']})]})]},o))})]}),s.termViolations.length>0&&e.jsxs("div",{children:[e.jsxs("h3",{className:"text-lg font-medium mb-2",children:["Term Bank Violations (",s.termViolations.length,")"]}),e.jsx("ul",{className:"list-disc list-inside space-y-1",children:s.termViolations.map((a,o)=>e.jsx("li",{className:"text-sm",children:a},o))})]}),s.acronymViolations.length>0&&e.jsxs("div",{children:[e.jsxs("h3",{className:"text-lg font-medium mb-2",children:["Acronym Violations (",s.acronymViolations.length,")"]}),e.jsx("ul",{className:"list-disc list-inside space-y-1",children:s.acronymViolations.map((a,o)=>e.jsx("li",{className:"text-sm",children:a},o))})]}),s.styleViolations.length===0&&s.termViolations.length===0&&s.acronymViolations.length===0&&e.jsx("div",{className:"text-center py-4",children:e.jsx("p",{className:"text-green-500 font-medium",children:"No violations found! Your text follows Microsoft style guidelines."})})]})]}),(s.styleViolations.length>0||s.termViolations.length>0)&&e.jsxs(f,{children:[e.jsxs(p,{children:[e.jsx(g,{children:"Improved Text"}),e.jsx(b,{children:"Here's your text with style improvements applied:"})]}),e.jsx(v,{children:e.jsx(j,{value:s.improvedText,readOnly:!0,rows:10,className:"w-full font-mono text-sm"})}),e.jsx(N,{children:e.jsx(R,{variant:"outline",onClick:()=>r(s.improvedText),children:"Use Improved Text"})})]})]}),e.jsx(Ee,{})]})},Pe=()=>{const[t,r]=l.useState(""),[s,n]=l.useState(""),[i,a]=l.useState(!1),o=()=>{a(!0);try{const c=Ce(t);n(c)}catch(c){console.error("Error transforming text:",c)}finally{a(!1)}};return e.jsx(ue,{children:e.jsxs("div",{className:"container mx-auto py-8 px-4 md:px-6 lg:px-8",children:[e.jsx("h1",{className:"text-4xl font-bold tracking-tight mb-4",children:"Microsoft Style Generator"}),e.jsx("p",{className:"text-lg text-muted-foreground mb-8",children:"Convert your documentation to Microsoft style or check your content against style guidelines"}),e.jsxs(J,{defaultValue:"generator",className:"w-full",children:[e.jsxs(I,{className:"grid w-full max-w-md grid-cols-2",children:[e.jsx(w,{value:"generator",children:"Generator"}),e.jsx(w,{value:"checker",children:"Style Checker"})]}),e.jsx(C,{value:"generator",className:"mt-6",children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[e.jsx(ve,{input:t,setInput:r,isGenerating:i,onGenerate:o}),e.jsx(Ne,{generatedContent:s})]})}),e.jsx(C,{value:"checker",className:"mt-6",children:e.jsx(Ie,{})})]}),e.jsx(P,{className:"my-10"}),e.jsxs("div",{className:"prose prose-blue dark:prose-invert max-w-none",children:[e.jsx("h2",{children:"About Microsoft Style"}),e.jsx("p",{children:"The Microsoft Style Guide provides guidelines for content creation that's clear, concise, and consistent. Our Microsoft Style Generator helps you transform your documentation to follow these guidelines automatically."}),e.jsx("h3",{children:"Key Microsoft Style Principles"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Use active voice:"})," Active voice makes your writing clearer and more direct."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Address the reader directly:"}),' Use "you" instead of "users" or "they."']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Be concise:"})," Use simple words and phrases instead of complex ones."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Use sentence-style capitalization:"})," Only capitalize the first word and proper nouns in headings."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Avoid jargon:"})," Use plain language that's easy to understand."]})]}),e.jsxs("p",{children:["For more information, visit our ",e.jsx("a",{href:"/docs/style-guide/microsoft-style",children:"Microsoft Style Guide"})," or consult the ",e.jsx("a",{href:"https://learn.microsoft.com/style-guide/",target:"_blank",rel:"noopener noreferrer",children:"official Microsoft Style Guide"}),"."]})]})]})})};export{Pe as default};
//# sourceMappingURL=MicrosoftStyleGenerator-BowIWV2p.js.map
