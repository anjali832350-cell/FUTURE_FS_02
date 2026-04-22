// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect("mongodb://127.0.0.1:27017/crmDB")
// .then(()=>console.log("MongoDB Connected"))
// .catch(err=>console.log(err));

// const LeadSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   source: String,
//   status: { type: String, default: "new" },
//   notes: String
// });

// const Lead = mongoose.model("Lead", LeadSchema);

// app.get("/leads", async (req,res)=>{
//   const data = await Lead.find();
//   res.json(data);
// });

// app.post("/leads", async (req,res)=>{
//   const newLead = new Lead(req.body);
//   await newLead.save();
//   res.json(newLead);
// });

// app.put("/leads/:id", async (req,res)=>{
//   const updated = await Lead.findByIdAndUpdate(req.params.id, req.body, {new:true});
//   res.json(updated);
// });

// app.delete("/leads/:id", async (req,res)=>{
//   await Lead.findByIdAndDelete(req.params.id);
//   res.json({msg:"Deleted"});
// });

// app.listen(5000, ()=>console.log("Server running on 5000"));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crmDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log("DB Error:", err));

const LeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  source: String,
  status: { type: String, default: "new" },
  notes: String
});

const Lead = mongoose.model("Lead", LeadSchema);

// GET
app.get("/leads", async (req,res)=>{
  try{
    const data = await Lead.find();
    res.json(data);
  }catch(err){
    console.log("GET ERROR:", err);
    res.status(500).json({error:"Server error"});
  }
});

// POST
app.post("/leads", async (req,res)=>{
  try{
    console.log("Incoming Data:", req.body); // 👈 debug
    const newLead = new Lead(req.body);
    await newLead.save();
    res.json(newLead);
  }catch(err){
    console.log("POST ERROR:", err);
    res.status(500).json({error:"Server error"});
  }
});

app.listen(5000, ()=>console.log("Server running on 5000"));
app.delete("/leads/:id", async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});