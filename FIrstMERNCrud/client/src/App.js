import { useState,useEffect } from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "2%",
  },
  heading:{
    textAlign:"center",
    fontSize:50,
    fontWeight:400
  },
  toph2:{
    textAlign: "center",
    fontSize:25
  },
  paper: {
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
  btn:{
    marginTop:20,
    marginBottom:20
  },
  title:{
    fontSize:20,
    fontWeight:"bold",
    textTransform :"uppercase"
    }
}));

function App() {
  const [posts, setPosts] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");


  
  const getData= async()=>{
    await axios({
      url: "api/",
      method: "GET",
    }).then((response)=>{
      const data = response.data
      setPosts(data)
      console.log(posts)
    }).catch(()=>{
      alert("Sorry we could Get the data Properly Please have a internet Connection")
    })
  }

  useEffect(() => {
    getData()
  }, [])
  

  const handletChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDChange = (e) => {
    setDesc(e.target.value);
  };
  const BtnClicked = (event) => {
    event.preventDefault();
    const payload = {
      title,
      desc,
    };
    axios({
      url: "api/add",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Data goes to Database");
      })
      .catch((error) => {
        console.log(error);
      });

    setDesc("");
    setTitle("");
    getData()
  };






  const dlthandler=(id)=>{
    console.log("delete the post with id",id)
   axios.delete(`api/delete/${id}`)
      .then(() => {
        console.log("Data get out from Database");
      })
      .catch((error) => {
        console.log(error);
      });
      getData()
  }




  const DisplayPost=(posts)=>{
    if(!posts.length) return null;
   return posts.map((post,i)=>{
     return(
      <Card className={classes.root}>
<CardContent key={i}>
  <Typography className={classes.title}>
    {post.title}
  </Typography>
  <Button variant="outlined" onClick={()=>dlthandler(post._id)} className={classes.btn}>Delete</Button>

  <Typography>
    {post.desc}
  </Typography>
      </CardContent>
      </Card>
           )
    })
  }




  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2 className={classes.heading}>Welcome to this Note application</h2>

      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <h2 className={classes.toph2}>All notes</h2>
  {DisplayPost(posts)}
            </Paper>

{/* {posts[0].title} */}


        </Grid>
        <Grid item xs={3}>
          <h3>Enter the Title</h3>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            onChange={handletChange}
          />
          <h3>Enter the decsription</h3>
          <TextField
            id="standard-multiline-static"
            label="Description"
            multiline
            rows={4}
            onChange={handleDChange}
            value={desc}
          />
          <h1>_</h1>
          <Button variant="outlined" color="secondary" onClick={BtnClicked}>
            Post The Note
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
