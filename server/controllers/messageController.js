import message from "../models/message.js";
import message from "../models/message.js";
import User from "../models/user.js";


//get all users except logged in user
export const getUserForSidebar =async (req, res)=>{
    try{
        const userId = req.user._id;
        const filteredUsers =await User.find({_id: {$ne: userId}}).select("-password");

        //count number of messages not seen
        const unseenMessages ={}
        const promises = filteredUsers.map(async (user)=>{
             const messages =await message.find({senderId: user._id, receiverId: userId, seen: false })
             if (message.length > 0){
                unseenMessages[user._id] = message.length;
             }
        })
        await Promise.all(promises);
        res.json({success: true, users: filteredUsers, unseenMessages})
    } catch (error){
        console.log(error.message);
         res.json({success: false, message: error.message})
    }
}

//Get aal messages for selected user
export const getMessages = async (req, res) =>{
  try{
     const {id: selectedUserId } = req.params;
     const myId = req.user._id;

     const message = await message.find({
        $or:[
            {senderId: myId, receiverId: selectedUserId},
            {senderId: selectedUserId, receiverId: myId},
        ]
     })
     await message.updateMany({senderId: selectedUserId, receiverId: myId}, {seen: true});

     res.json({success: true, message})

  } catch (error){
    console.log(error.message);
         res.json({success: false, message: error.message})
  }

}

// api  to mark message as seen using message id
export const markMessageAsSeen =async (req, res)=>{
    try {
        const {id} = req.params;
        await message.findByIdAndUpdate(id, {seen: true})
        res.json({success: true})
        
    } catch (error) {
        console.log(error.message);
         res.json({success: false, message: error.message})
        
    }

}