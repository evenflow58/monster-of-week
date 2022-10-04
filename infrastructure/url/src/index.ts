import path from "path";

export const handler = async (event: any): Promise<any> => {
  const request = event.Records[0].cf.request;

  console.log("original uri", request.uri);

  if (!path.extname(request.uri)) {
    console.log("changing path");
    request.uri = request.uri.replace(/\/?$/, "/index.html");
  }

  console.log("new URI", request.uri);

  // request.uri = `/serve-site-from-edge-lambda${request.uri}`;
  request.uri = `/${request.origin.s3.customHeaders["x-env-branch"][0].value}${request.uri}`;

  console.log("finished uri", request.uri);

  return request;
};
