import {
  CloudFormationClient,
  DeleteStackCommand,
  DeleteStackCommandInput,
} from "@aws-sdk/client-cloudformation";

export const handler = async (event: { BranchName: string }): Promise<any> => {
  console.log("event", event);

  const branchName = event.BranchName;
  if (branchName === "master") {
    console.log("Not deleting anything because this is the master branch.");
    return;
  }

  const client = new CloudFormationClient({ region: "us-east-1" });

  const deleteDeployInput: DeleteStackCommandInput = {
    StackName: `monster-week-${branchName}-Stack-Beta`,
  };
  const deleteDeployCommand = new DeleteStackCommand(deleteDeployInput);

  const deletePipelineInput: DeleteStackCommandInput = {
    StackName: `monster-week-${branchName}`,
  };
  const deletePipelineCommand = new DeleteStackCommand(deletePipelineInput);

  console.log(`Deleting environment for ${branchName}`);

  return await Promise.all([
    client.send(deleteDeployCommand),
    client.send(deletePipelineCommand),
  ]);
};
