// ---- AfterCallPro Production Bundle ----
import React from "https://esm.sh/react";
import { createRoot } from "https://esm.sh/react-dom/client";
import { BrowserRouter } from "https://esm.sh/react-router-dom";

function Home() {
  return React.createElement(
    "div",
    { style:{minHeight:"100vh",display:"grid",placeItems:"center",background:"#0b1423",color:"#fff"} },
    React.createElement(
      "div",
      { style:{textAlign:"center"} },
      [
        React.createElement("h1",{style:{marginBottom:8}}, "AfterCallPro"),
        React.createElement("p",{style:{opacity:.8,marginBottom:16}}, "Frontend sanity check ✔️"),
        React.createElement(
          "div",
          {style:{display:"flex",gap:12,justifyContent:"center"}},
          [
            React.createElement("a",{href:"/login",style:{padding:"8px 12px",border:"1px solid #3b4a64",borderRadius:12,color:"#fff"}}, "Login"),
            React.createElement("a",{href:"/signup",style:{padding:"8px 12px",background:"#fff",borderRadius:12,color:"#0b1423"}}, "Signup")
          ]
        )
      ]
    )
  );
}

function App(){
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(Home,null)
  );
}

createRoot(document.getElementById("root")).render(
  React.createElement(React.StrictMode,null,
    React.createElement(App,null)
  )
);
