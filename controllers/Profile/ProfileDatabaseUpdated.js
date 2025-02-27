const { getObjectUrl } = require("../../AwsConnection/AwsS3Client");
const UserManager = require("../../models/UserSchema");
const RedisManager = require("../../RedisConnection/RedisConnection");

const ProfileDatabaseUpdated= async(req,res)=>{

   const {filename}=req.body;
   const _id =req.body.user._id;
   if(filename==null){
    return res.status(404).send({Message:"Please Send Something"})
   }

   const GettingSignedUrl = await getObjectUrl(`Uploads/User_Uploads/Profilepictures/${filename}`)

   if(GettingSignedUrl){
      const updatingDatabase =await UserManager.findOneAndUpdate({_id:_id},{
        $set:{
            'avatar':GettingSignedUrl
        }
      })
      await RedisManager.del(`${_id}Profile`)

      return res.status(200).send({Message:"Changed"})
   }

   return res.status(400).send({Message:"Please Try Again Later Error Occuredd"})
 


}


module.exports = ProfileDatabaseUpdated;