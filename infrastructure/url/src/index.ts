// import {
//   S3Client,
//   GetObjectCommand,
//   GetObjectCommandInput,
// } from "@aws-sdk/client-s3";

import path from "path";

export const handler = async (event: any): Promise<any> => {
  console.log(JSON.stringify(event));

  const request = event.Records[0].cf.request;

  console.log("uri", request.uri);

  return request;

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

  // if (!path.extname(request.uri)) {
  //   console.log("changing path");
  //   request.uri = request.uri.replace(/\/?$/, "/index.html");
  // }

  // request.uri = `serve-site-from-edge-lambda${request.uri}`;

  // console.log("uri", request.uri);

  // return request;
};
