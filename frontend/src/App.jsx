// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App


import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    source: "",
    notes: ""
  });

  const fetchLeads = async () => {
    const res = await axios.get("http://localhost:5000/leads");
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const addLead = async () => {
    await axios.post("http://localhost:5000/leads", form);
    setForm({name:"", email:"", source:"", notes:""});
    fetchLeads();
  };

  const deleteLead = async (id) => {
    console.log("Deleting:", id);
    await axios.delete(`http://localhost:5000/leads/${id}`);
    fetchLeads();
  };

  const updateStatus = async (id, status) => {
  await axios.put(`http://localhost:5000/leads/${id}`, { status });
  fetchLeads();
};

const updateNotes = async (id, notes) => {
  await axios.put(`http://localhost:5000/leads/${id}`, { notes });
  fetchLeads();
};

  return (

    <div style={{padding:"20px", textAlign:"center", fontFamily:"Arial"}}>
      <h1>Mini CRM</h1>

      <input placeholder="Name"
      value={form.name}
        onChange={(e)=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Email"
      value={form.email}
        onChange={(e)=>setForm({...form,email:e.target.value})}/>

      <input placeholder="Source"
      value={form.source}
        onChange={(e)=>setForm({...form,source:e.target.value})}/>
      <input placeholder="Notes"
      value={form.notes}
        onChange={(e)=>setForm({...form,notes:e.target.value})}/>

      <button onClick={addLead}>Add</button>

      {/* <ul>
        {leads.map(l=>(
          <li key={l._id}>
            {l.name} - {l.email}
            <button onClick={()=>deleteLead(l._id)}>Delete</button>
          </li>
        ))}
      </ul> */}
      <table border="1" cellPadding="10" margin="5px">
  <thead>
    <tr style={{
      borderCollapse: "separate",
      borderSpacing: "0 10px"
    }}>
      <th>Name</th>
      
      <th>Email</th>
      <th>Source</th>
      <th>Status</th>
      <th>Notes</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    {leads.map((lead) => (
      <tr key={lead._id}>
        <td>{lead.name}</td>
        <td>{lead.email}</td>
        <td>{lead.source}</td>

        {/* STATUS DROPDOWN */}
        <td>
          <select
            value={lead.status}
            onChange={(e) =>
              updateStatus(lead._id, e.target.value)
            }
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
          </select>
        </td>

        {/* NOTES EDIT */}
        <td>
          <input
            defaultValue={lead.notes}
            onBlur={(e) =>
              updateNotes(lead._id, e.target.value)
            }
          />
        </td>

        <td>
          <button onClick={() =>{
            console.log("CLICK WORKING");
           deleteLead(lead._id);
           }}
           >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}

export default App;