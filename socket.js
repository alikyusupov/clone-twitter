const {
    saveChatRoomToDB,
    deleteChatDB,
    saveChatHisotry,
} = require("./utils/socket/database");

const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
} = require("./utils/socket/users");
module.exports = io => {

    io.on("connection", (socket) => {
        socket.on("joinRoom", async ({ username, roomName }) => {
            // join a user
            const user = userJoin(socket.id, username, roomName);
            // join a room
            socket.join(user.room);
            // send users and room info
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            });
            // save chatRoom into DB
            await saveChatRoomToDB(user);

            // notification at connection
            socket.broadcast.to(user.room).emit("user connected", username);
            // on chat message
            socket.on("chat message", async (msg) => {
                // emit that message to everyone
                io.to(user.room).emit("chat message", msg);
                await saveChatHisotry(msg, user);
            });

            // on typing event
            socket.on("user typing", (username) => {
                socket.broadcast.to(user.room).emit("user typing", username);
            });

            // on disconnect
            socket.on("disconnect", async () => {
                // delete a user from Chat at DB
                await deleteChatDB(user);
                userLeave(user.id);
                socket.broadcast.to(user.room).emit("user disconnected", username);
                // send users and room info
                io.to(user.room).emit("roomUsers", {
                    room: user.room,
                    users: getRoomUsers(user.room),
                });
            });
        });
    });
}