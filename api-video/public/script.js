const socket = io("http://localhost:5040",{
  transports: ['websocket'],
  rejectUnauthorized: false
});
/**,{
  transports: ['websocket'],
  rejectUnauthorized: false
} */
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
const showChat = document.querySelector("#showChat");
const backBtn = document.querySelector(".header__back");
myVideo.muted = true;

backBtn.addEventListener("click", () => {
  document.querySelector(".main__left").style.display = "flex";
  document.querySelector(".main__left").style.flex = "1";
  document.querySelector(".main__right").style.display = "none";
  document.querySelector(".header__back").style.display = "none";
});

showChat.addEventListener("click", () => {
  document.querySelector(".main__right").style.display = "flex";
  document.querySelector(".main__right").style.flex = "1";
  document.querySelector(".main__left").style.display = "none";
  document.querySelector(".header__back").style.display = "block";
});
var peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "3030",
  secure: false,
  debug: true
});
const user = prompt("Enter your name"); 

const peers = {}

let myVideoStream;
navigator.mediaDevices
  .getUserMedia({
    audio: true,
    video: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
      call.on("answer",()=>{

      })
    });

    socket.on("user-connected", (userId) => {
      //Aqui mero
      console.log("aqui mero");
      console.log(stream);
      connectToNewUser(userId, stream);
      //peer.emit("call",call);
    });
  });

const connectToNewUser = (userId, stream) => {
  console.log(userId);
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  
  call.on('stream', (userVideoStream) => {
    console.log("Aqui agregamos el stream");
    addVideoStream(video, userVideoStream);
  });
  call.on('close',()=>{
    video.remove();
  })
  peers[userId]=call;
};
/**
 *socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})
 
 */
peer.on("open", (id) => {
  console.log(ROOM_ID);
  socket.emit("join-room", ROOM_ID, id, user);
});

const addVideoStream = (video, stream) => {
  console.log(stream);
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    console.log("insertando video");
    video.play();
    videoGrid.append(video);
  });
};

let text = document.querySelector("#chat_message");
let send = document.getElementById("send");
let messages = document.querySelector(".messages");

send.addEventListener("click", (e) => {
  if (text.value.length !== 0) {
    socket.emit("message", text.value);
    text.value = "";
  }
});

text.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && text.value.length !== 0) {
    socket.emit("message", text.value);
    text.value = "";
  }
});

const inviteButton = document.querySelector("#inviteButton");
const muteButton = document.querySelector("#muteButton");
const stopVideo = document.querySelector("#stopVideo");
muteButton.addEventListener("click", () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    html = `<i class="fas fa-microphone-slash"></i>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  } else {
    myVideoStream.getAudioTracks()[0].enabled = true;
    html = `<i class="fas fa-microphone"></i>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  }
});

stopVideo.addEventListener("click", () => {
  const enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    html = `<i class="fas fa-video-slash"></i>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  } else {
    myVideoStream.getVideoTracks()[0].enabled = true;
    html = `<i class="fas fa-video"></i>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  }
});

inviteButton.addEventListener("click", (e) => {
  prompt(
    "Copy this link and send it to people you want to meet with",
    window.location.href
  );
});

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})

socket.on("createMessage", (message, userName) => {
  messages.innerHTML =
    messages.innerHTML +
    `<div class="message">
        <b><i class="far fa-user-circle"></i> <span> ${
          userName === user ? "me" : userName
        }</span> </b>
        <span>${message}</span>
    </div>`;
});

//Crear un metodo de un boton que nos permita realizar un request a la otra api para extraer los signos vitales, ya tenemos el id de la consulta
//Imprimirlos en la vista para que se renderice y podamos realizas lo demas