const {getObjectUrlForUpload} = require('../../AwsConnection/AwsS3Client')
const updateprofileimage =async (req,res)=>{
try{
    console.log(req.body)
    const {fileName,fileSize,fileType}=req.body
    console.log(fileName)
    const maxSize = 13 * 1024 * 1024;
    const randnum= Math.floor(Math.random()*10000)
    const finalfilename = `${fileName}:${randnum}`;
    const acceptedTypes = ['image/png','image/jpg','image/jpeg']
    if(!fileName.trim() || fileSize==0 || !fileType.trim()){
        return res.status(404).send({Message:"Please Upload File"})
    }
    if(fileSize>maxSize || !acceptedTypes.includes(fileType)){
      
        return  fileSize>maxSize ? 
      res.status(413).send({Message:'Image Size Exceeds 10 Mb Make Sure Image is not greater than 10 mb'})
      :res.status(415).send({Message:'Unsupported File Type'})
    }

    const SignedUrl = await getObjectUrlForUpload(`Uploads/User_Uploads/Profilepictures/${finalfilename}`,fileType)
    if(SignedUrl){
        return res.status(200).send({SignedUrl,finalfilename})
    }

    return res.status(404).send({Message:'Some Error Occurred'})

}catch(err){
    console.log(err)
     return res.status(500).send({Message:"Internal Server Error"})

}
}

module.exports = updateprofileimage