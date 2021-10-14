import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

function App() {
  const [friends, setFriends] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(20);
  
  const [edname,setedName]=useState()
  const [edage,setedAge]=useState()

  const btnHandler = async () => {
    await axios
      .post("http://localhost:8000/api/add", {
        name: name,
        age: age,
      })
      .then(() => {
        console.log("data sent");
      })
      .catch(() => {
        console.log("Some error occured");
      });
    getFrienddata();
    setName("");
    setAge("");
  };

  const getFrienddata = async () => {
    await axios
      .get("http://localhost:8000/api/read")
      .then((response) => {

        setFriends(response.data);
        console.log(typeof(friends));
      })

      .catch((err) => {
        console.log("Couldnot get the data from Backend");
      });
  };

  useEffect(() => {
    getFrienddata();
  }, []);

  const updateFriends=(id)=>{
    axios.put('http://localhost:8000/api/update',{
      id:id,
    edname:edname,
    edage:edage
    }).then(()=>{
      console.log("data update huna gayo")
    }).catch(()=>{
      console.log("data update huna sakdaina")
    })
    getFrienddata()
  }

  const deletefriend=(id)=>{
    axios.delete(`http://localhost:8000/api/delete/${id}`).then(()=>{
      console.log("friend deleted ")
    }).catch(()=>{
    console.log("error occured")
  })
  getFrienddata()
  }





  

  return (
    <div className="App">
      <h1>CRUD APP WITH MERN </h1>
      <div className="lineby-line">
        <input
        className="input"

          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Enter your Friend's name"
        />
        <input
        className="input"
          type="number"
          onChange={(e) => setAge(e.target.value)}
          value={age}
          placeholder="Enter your Friend's Age"
        />
        <button onClick={btnHandler}>Add Friend</button>
      </div>

      {
    friends.map((frn, i) => {
        return (
          <div key={i}>
            <Grid item xs={3}>
              <Paper className="paper">
                <h1>Name</h1>
                <p>{frn.name}</p>
                <h1>Age</h1>
                <p>{frn.age}</p>
                <p style={{color:'gray',fontSize:20}}>must Have to update both</p>
                <input placeholder="Edit Friends Name" onChange={(e)=>setedName(e.target.value)} />
                <input placeholder="Edit his age" onChange={(e)=>setedAge(e.target.value)} />

              <Button variant="contained" color="secondary" onClick={()=>updateFriends(frn._id)}>
                Update
              </Button>
              <Button variant="contained" color="secondary" onClick={()=>deletefriend(frn._id)}>
Delete              </Button>
              </Paper>
            </Grid>
          </div>
        );
        })
      }
    </div>
  );
}

export default App;
