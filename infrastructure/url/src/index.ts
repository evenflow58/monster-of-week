export const handler = async (): Promise<any> => {
  const response = {
    status: 200,
    statusDescription: "OK",
    body: "Lambda@Edge is awesome! Part 3!",
  };

  return response;
};
