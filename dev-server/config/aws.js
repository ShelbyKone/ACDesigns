import aws from 'aws-sdk'

aws.config.setPromisesDependency();

aws.config.update({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: process.env.REGION
});

export default aws