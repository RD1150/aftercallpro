import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

function Home() {
  return (
    <div style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#0b1423",color:"#fff"}}>
      <div style={{textAlign:"center"}}>
        <h1 style={{marginBottom:8}}>AfterCallPro</h1>
        <p style={{opacity:.8,marginBottom:16}}>Frontend sanity check ✅</p>
        <div style={{display:"flex",gap:12,justifyContent:"center"}}>
          <Link to="/login" style={{padding:"8px 12px",border:"1px solid #3b4a64",borderRadius:12,color:"#fff"}}>Login</Link>
          <Link to="/signup" style={{padding:"8px 12px",background:"#fff",borderRadius:12,color:"#0b1423"}}>Signup</Link>
        </div>
      </div>
    </div>
  );
}

function Login() {
  const [email, setEmail] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  return (
    <div style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#f8fafc"}}>
      <div style={{width:380,background:"#fff",border:"1px solid #e5e7eb",borderRadius:16,padding:20}}>
        <h2 style={{marginBottom:12}}>Login (temporary)</h2>
        <div style={{display:"grid",gap:10}}>
          <label>
            <div style={{fontSize:12,opacity:.8}}>Email</div>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
              style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1px solid #e5e7eb"}} />
          </label>
          <label>
            <div style={{fontSize:12,opacity:.8}}>Password</div>
            <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)}
              style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1px solid #e5e7eb"}} />
          </label>
          <button onClick={()=>alert(`(temp) login ${email}`)}
            style={{padding:"10px 14px",borderRadius:8,background:"#0f172a",color:"#fff",cursor:"pointer"}}>Sign in</button>
        </div>
        <div style={{marginTop:12,fontSize:14}}><Link to="/">← Back home</Link></div>
      </div>
    </div>
  );
}

function Signup() {
  const [company, setCompany] = React.useState("");
  const [email, setEmail] = React.useState("");
  return (
    <div style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#f8fafc"}}>
      <div style={{width:380,background:"#fff",border:"1px solid #e5e7eb",borderRadius:16,padding:20}}>
        <h2 style={{marginBottom:12}}>Signup (temporary)</h2>
        <div style={{display:"grid",gap:10}}>
          <label>
            <div style={{fontSize:12,opacity:.8}}>Company</div>
            <input value={company} onChange={e=>setCompany(e.target.value)}
              style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1px solid #e5e7eb"}} />
          </label>
          <label>
            <div style={{fontSize:12,opacity:.8}}>Work Email</div>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
              style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1px solid #e5e7eb"}} />
          </label>
          <button onClick={()=>alert(`(temp) signup ${company} / ${email}`)}
            style={{padding:"10px 14px",borderRadius:8,background:"#0f172a",color:"#fff",cursor:"pointer"}}>Create account</button>
        </div>
        <div style={{marginTop:12,fontSize:14}}><Link to="/">← Back home</Link></div>
      </div>
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(p){ super(p); this.state={hasError:false,msg:""}; }
  static getDerivedStateFromError(err){ return {hasError:true,msg:err?.message||"Unknown error"};}
  componentDidCatch(err, info){ console.error("App error:", err, info); }
  render(){
    if(this.state.hasError){
      return (
        <div style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#fef2f2",color:"#991b1b"}}>
          <div style={{background:"#fff",border:"1px solid #fecaca",borderRadius:16,padding:20,maxWidth:560}}>
            <h2 style={{marginTop:0}}>Something went wrong</h2>
            <p>{this.state.msg}</p>
            <a href="/" style={{display:"inline-block",padding:"8px 12px",background:"#dc2626",color:"#fff",borderRadius:8}}>Reload app</a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App(){
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="*" element={<Navigate to="/" replace/>} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
