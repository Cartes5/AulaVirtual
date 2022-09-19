const app = require("./index");
const socketio = require("socket.io");
const { Class } = require("./models/models");

const server = app.listen(process.env.PORT || 3009, () =>
  console.log("Server Spinning")
);

const io = socketio(server);

io.on("connection", (socket) => {
  console.log("usuario conectado:", socket.id);

  // UNION
  socket.on("join_room", (secretKey) => {
    socket.join(secretKey);
    console.log(socket.id, " ha entrado ", secretKey);
  });

  // MENSAJERÍA
  socket.on("send_message", (data) => {
    console.log(data);

    // ENVÍO A OTROS USUARIOS EN EL MISMO CHAT
    socket.to(data.secretKey).emit("receiving_msg", data);

    // GUARDAR EN DB
    Class.find({ secretKey: data.secretKey }, async (err, doc) => {
      err ? console.log(err) : await doc[0].messages.push(data);
      let upDoc = doc[0];
      Class.findOneAndUpdate(
        { secretKey: data.secretKey },
        upDoc,
        { new: true, returnOriginal: false },
        (error, success) => {
          error ? console.log(error) : console.log("Actualizado");
        }
      );
    });
  });

  // SALIENDO DE SALA
  socket.on("leave_chat", async (data) => {
    await socket.leave(data.secretKey);
    console.log("El usuario ha dejado la sala: ", data.secretKey);
  });

  // DESCONECTANDO DEL SOCKET SERVER
  socket.on("disconnect", () => {
    console.log("Usuario desconectado del socket server", socket.id);
  });
});