// import {
//   S3Client,
//   GetObjectCommand,
//   GetObjectCommandInput,
// } from "@aws-sdk/client-s3";

export const handler = async (event: any): Promise<any> => {
  console.log(JSON.stringify(event));

  const request = event.Records[0].cf.request;

  console.log("uri", request.uri);

  // const input: GetObjectCommandInput = {
  //   Bucket: "monster-of-the-week-ui",
  //   Key: "serve-site-from-edge-lambda/index.html",
  // };
  // const command = new GetObjectCommand(input);
  // const client = new S3Client({ region: "us-east-1" });

  // console.log("getting files");

  // const file = await client.send(command);

  // const response = {
  //   status: 200,
  //   statusDescription: "OK",
  //   body: file.Body,
  // };

  // return response;

  return {
    status: "301",
    statusDescription: "Found",
    headers: {
      location: [
        {
          key: "Location",
          value: `https://${"serve-site-from-edge-lambda.monsterplaybook.rip"}/${
            request.uri
          }`,
        },
      ],
    },
  };
};
