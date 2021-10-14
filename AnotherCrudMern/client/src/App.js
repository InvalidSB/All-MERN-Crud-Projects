import "./App.css";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "5%",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();

  const [dataList, setDataList] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [qlty, setQlty] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/api/add", {
        name: name,
        age: age,
        address: address,
        phone: phone,
        qlty: qlty,
      })
      .then(() => {
        // setDataList([
        //   ...dataList,
        //   { name: name, age: age, address: address, phone: phone, qlty: qlty },
        // ]);

        console.log("data sent to database");
      })
      .catch((err) => console.log(err));
    getData();
    setName("");
    setAddress("");
    setAge("");
    setPhone("");
    setQlty("");
  };

  const getData = () => {
    axios
      .get("http://localhost:5000/api/read")
      .then((response) => {
        console.log("data is :", response);
        setDataList(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:5000/api/delete/${id}`)
      .then(() => console.log("This is gone for deoletion Process"))
      .catch((err) => console.log("some error occured"));
    getData();
  };

  const updateHandler = (id) => {
    const newage = prompt("enter the age to be updated :");
    const newaddress = prompt("enter the address to be updated :");
    const newphone = prompt("enter the phone no to be updated :");
    const newqlty = prompt("enter the reputation no to be updated :");
    axios
      .put("http://localhost:5000/api/update", {
        newage: newage,
        id: id,
        newaddress: newaddress,
        newphone: newphone,
        newqlty: newqlty,
        
      })
      .then(() => console.log("data goes for updation process"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" ,color:"white",backgroundColor:"green",padding:"15px",borderRadius:"10px"}}>Simple Student Details Management System</h1>

      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <h2 style={{ textAlign: "center" }}>
              Fill up The Student's Details
            </h2>
            <div style={{ textAlign: "center" }}>
              <TextField
                id="outlined-basic"
                className="textfield"
                style={{ marginBottom: "20px" }}
                label="Full Name"
                variant="outlined"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
              <TextField
                id="outlined-basic"
                className="textfield"
                style={{ marginBottom: "20px" }}
                label="Age "
                variant="outlined"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                value={age}
                type={Number}
              />
              <TextField
                id="outlined-basic"
                className="textfield"
                style={{ marginBottom: "20px" }}
                label="Address"
                variant="outlined"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                value={address}
              />
              <TextField
                id="outlined-basic"
                className="textfield"
                style={{ marginBottom: "20px" }}
                label="Phone no."
                variant="outlined"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
                type={Number}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <h2 style={{ marginRight: "20px" }}>Quality</h2>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    native
                    style={{ width: "230px" }}
                    onChange={(e) => setQlty(e.target.value)}
                  >
                    <option aria-label="None" value={qlty} />
                    <option value={"topper"}>topper</option>
                    <option value={"Average"}>Average</option>
                    <option value={"BelowAverage"}>Below Average</option>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div style={{ alignItems: "end", marginLeft: "60%" }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleSubmit}
              >
                Submit Details
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            {dataList.map((val, i) => {
              return (
                <div style={{ marginBottom: "20px" }} key={i}>
                  <Grid item xs={6} sm={12}>
                    <Paper className={classes.paper}>
                      <h1>{val.name} ,</h1>{" "}
                      <h2>
                        A {val.age} years old guy is one of the {val.qlty}{" "}
                        student of the class. He is from {val.address} .Contact
                        him on {val.phone}.
                      </h2>
                      <Button onClick={() => updateHandler(val._id)}>
                        Update
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => deleteHandler(val._id)}
                      >
                        Delete
                      </Button>
                    </Paper>
                  </Grid>
                </div>
              );
            })}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
