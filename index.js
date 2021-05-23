const express =  require("express")
const app =  express();
const pool = require("./db")

app.use(express.json())

//routes

//get all todo
app.get("/todos", async (req, res)=> {
    try{
        const alltodos = await pool.query("SELECT * FROM todo");
        res.json(alltodos.rows)
    }catch(err){
        console.log(err.message);
    }
})

// get a todo

app.get("/todos/:id", async (req, res )=> {
    const { id } =  req.params;
    try {
        const todo =  await pool.query( "SELECT * FROM todo WHERE todo_id = $1", [id])
        res.json(todo.rows[0])
    } catch (error) {
        console.log(err.message)
    }
})



//create a todo

app.post("/todos", async (req, res)=> {
    try{
       const { description } = req.body;
       const newTodo = await pool.query(
           "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
       );
       res.json(newTodo.rows[0]);
    }catch(err){
        console.error(err.message)

    }
});


//update a todo

app.put("/todos/:id",  async (req, res )=> {
    try {
        const { id }= req.params;
        const{description} = req.body;
        const updateTodo =  await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",[description,id]
        )
        res.json("todo was updated")
        
    } catch (err) {
        console.log(err.message)
        
    }
})

//delete a todo

app.delete("/todos/:id", async (req, res)=> {
    try {
        const {id} = req.params;
        const deletetodo = await pool.query("DELETE FROM todo WHERE todo_id =$1",[id])
        res.json("Todo was succesfully deleted")
       } catch (err) {
        console.log(err.message)
    }
})



app.listen(5000, ()=> {
    console.log("server is listening at port 5000")
})

