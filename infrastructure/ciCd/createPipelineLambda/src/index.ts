import {
  CloudFormationClient,
  CreateStackCommand,
  CreateStackCommandInput,
} from "@aws-sdk/client-cloudformation";

export const handler = async (event: { BranchName: string }): Promise<any> => {
  if (event.BranchName === "master") {
    console.log("Not creating anything because this is the master branch.");
    return;
  }

  const client = new CloudFormationClient({ region: "us-east-1" });
  const input: CreateStackCommandInput = {
    StackName: `monster-week-${event.BranchName}`,
    TemplateURL: `https://github.com/evenflow58/monster-of-week/tree/master/infrastructure/pipeline/template.yaml`,
    Parameters: [
      {
        ParameterKey: "BranchName",
        ParameterValue: event.BranchName,
        UsePreviousValue: false,
      },
    ],
    OnFailure: "ROLLBACK",
    Capabilities: ["CAPABILITY_NAMED_IAM"],
  };
  const command = new CreateStackCommand(input);

  console.log(`Creating environment for ${event.BranchName}`);

  return await client.send(command);
};
