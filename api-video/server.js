const express = require("express");
const app = express();
const server = require("http").Server(app);
const https = require("https")
const { v4: uuidv4 } = require("uuid");


app.set("view engine", "ejs");
const io = require("socket.io")(server,{
  cors:{
    origin: "http://localhost:3030",
    methods: ["GET", "POST"]
  }
});
//estp es new
io.listen(5040);

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

const urlApi = "http://localhos:8081/";

app.use("/peerjs", peerServer);
app.use(express.static("public")); 

app.get("/", (req, res) => {
  //Aqui vamos a insertar este id generado en la videollamada de la consulta 
  //el id de consulta nos llegara al ingresar aqui, quien ingrese, es quien setteara el id del room
  //Con el id de consulta, enviarlo por headers ahi.
  /*
  var idConsulta=undefined;
  if(req.body.idConsulta!=null){
     idConsulta = req.body.idConsulta;
  }
  const a = uuidv4();
  
  //Aqui la funcion de insertar en la otra api.
  https.get(urlApi+"consulta/setToken?id="+idConsulta+"&token="+a, (resp)=>{
    let data = '';
    resp.on('end', ()=>{
      console.log(JSON.parse(data).explanation)
    });
  }).on('error', (err)=>{
    console.log("Error: "+err.message);
  });
  */
  
  //Aqui se redireciona al room de la llamada
  res.redirect(`/${uuidv4()}`);
  //res.redirect(`/call?room=${a}&consulta=${idConsulta}`,);
});
app.get("/:room", (req,res)=>{
  res.render("room", { roomId: req.params.room });
});
//--> /:room
app.get("/call", (req, res) => {
  //establecer el id de consulta como parametro, para acceder a todo desde el script, parecido a lo que esta aqui, solo creamos una nueva variable
  //aqui obtenemos y setteamos el username, tanto quien consulta como la enfermera que tiene al paciente
  //Seteamos el id
  console.log(req.query.consulta, req.query.room);
  res.render("room", { roomId: req.query.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, userName) => {
    console.log(`socket ${userId} has joined room ${roomId}`);
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);

    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message, userName);
    });
  });

  socket.on('disconnecting', () => {
    console.log(socket.rooms); // the Set contains at least the socket ID
  });

  socket.on('disconnect', () => {
    // socket.rooms.size === 0
  });

  /**
   *socket.on('disconnect', () => {
    socket.to(roomId).broadcast.emit('user-disconnected', userId)
  }) 
   */
  
});

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

server.listen(process.env.PORT || 3030);

/*
const cors = require('cors');
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET"
}));
*/  