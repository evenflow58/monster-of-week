// import {
//   S3Client,
//   GetObjectCommand,
//   GetObjectCommandInput,
// } from "@aws-sdk/client-s3";

import path from "path";

export const handler = async (event: any): Promise<any> => {
  const request = event.Records[0].cf.request;

  console.log("original uri", request.uri);

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

  if (!path.extname(request.uri)) {
    console.log("changing path");
    request.uri = request.uri.replace(/\/?$/, "/index.html");
  }

  // console.log("new URI", request.uri);

  // request.uri = `serve-site-from-edge-lambda${request.uri}`;

  console.log("finished uri", request.uri);

  return request;
};
