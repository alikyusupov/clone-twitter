const Chat = require("../../models/Chat");

async function saveChatRoomToDB(user) {
    try {
        // check if chat exists
        let isCreated = await Chat.exists({ chat_id: user.room });
        if (!isCreated) {
            // if chat doesn't exist - creating a new one
            let chat = new Chat({
                chat_id: user.room,
                users: user.username,
            });
            await chat.save();
        } else {
            // updating the existing one
            await Chat.findOneAndUpdate(
                { chat_id: user.room },
                { $push: { users: user.username } }
            ).exec();
        }
    } catch (err) {
        console.log(err);
    }
}

async function deleteChatDB(user) {
    try {
        await Chat.findOneAndUpdate(
            { chat_id: user.room },
            { $pull: { users: user.username } }
        );
        // delete a chat if there's no users left
        let isEmpty = await Chat.exists({ chat_id: user.room, users: [] }
        );
        if (isEmpty) {
            await Chat.findOneAndDelete(
                { chat_id: user.room },
                { users: [] }
            ).exec();
        }
    } catch (err) {
        console.log(err);
    }
}

async function saveChatHisotry(msg, user) {
    try {
        await Chat.findOneAndUpdate(
            { chat_id: user.room },
            {
                $push: {
                    chat_fields: `[${msg.time}] - ${msg.username} : ${msg.value}`,
                },
            }
        ).exec();
    } catch (err) {
        console.log(err)
    }
}
module.exports = { saveChatRoomToDB, deleteChatDB, saveChatHisotry };
