import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ host: '0.0.0.0', port: 8000 });
let userCount = 0;
let allsokets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        let objmessage = JSON.parse(message);
        if (objmessage.type == "join") {
            allsokets.push({
                socket,
                room: objmessage.payload.roomId
            });
            //@ts-ignore
        }
        if (objmessage.type == "chat") {
            let currentUserRoom = null;
            for (let i = 0; i < allsokets.length; i++) {
                // @ts-ignore
                if (allsokets[i].socket == socket) {
                    // @ts-ignore
                    currentUserRoom = allsokets[i].room;
                }
            }
            for (let i = 0; i < allsokets.length; i++) {
                // @ts-ignore
                if (allsokets[i].room == currentUserRoom) {
                    //@ts-ignore
                    allsokets[i].socket.send(objmessage.payload.message);
                }
            }
        }
    });
    // wss.on("connection", (socket) => {
    //     console.log("User connected");
    //     userCount += 1;
    //     console.log("User count: " + userCount);
    //     allsokets.push(socket)
    //     socket.on("message",(message)=>{
    //         for(let i=0;i<allsokets.length;i++){
    //             const s = allsokets[i]
    //             setTimeout(()=>{s.send(message.toString())},1000)
    //             // s.send(message.toString())
    //         }
    //     })
});
//# sourceMappingURL=index.js.map