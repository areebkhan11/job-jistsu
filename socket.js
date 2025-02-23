const socketIO = require("socket.io");
const ChatModel = require("./models/schemas/chatSchema"); // Import ChatModel

exports.io = (server) => {
    const io = socketIO(server, { cors: { origin: "*" } });

    io.on("connection", async (socket) => {
        const senderId = socket.handshake?.headers?.userid; // Extract user ID from headers

        if (!senderId) {
            console.log("User ID not provided in headers");
            return;
        }

        try {
            // Update user status to online
            // const userObj = await updateUser({ _id: senderId }, { $set: { online: true } });

            // Notify other users
            // socket.broadcast.emit("user-connected", userObj);

            // console.log(`User ${senderId} connected`);

            // Send past messages to the newly connected user
            const pastMessages = await ChatModel.find()
            .sort({ createdAt: 1 })
            .populate('sender', 'firstName lastName image') 
            socket.emit("pastMessages", pastMessages)
           
        } catch (error) {
            console.error("Error updating user status:", error);
        }

        // Listen for new messages
        socket.on("sendMessage", async ({ sender, message }) => {
            try {
                const newMessage = new ChatModel({ sender, message });
                await newMessage.save();

                 // Populate user details before broadcasting
                 const populatedMessage = await ChatModel.findById(newMessage._id)
                 .populate('sender', 'firstName lastName image')

                io.emit("newMessage", populatedMessage); // Broadcast message to all users
            } catch (error) {
                console.error("Error saving message:", error);
            }
        });

        // Handle user disconnection
        socket.on("disconnect", async () => {
            try {
                await updateUser({ _id: senderId }, { $set: { online: false } });
                socket.broadcast.emit("user-disconnected", { userId: senderId });
                console.log(`User ${senderId} disconnected`);
            } catch (error) {
                console.error("Error updating user status on disconnect:", error);
            }
        });
    });
};
