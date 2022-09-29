import {
  CloudFormationClient,
  DeleteStackCommand,
  DeleteStackCommandInput,
  ListStackResourcesCommandInput,
  ListStackResourcesCommand,
  ListStackResourcesCommandOutput,
  waitUntilStackDeleteComplete,
  DescribeStacksCommandInput,
} from "@aws-sdk/client-cloudformation";
import { WaiterConfiguration } from "@aws-sdk/util-waiter";
import { v4 } from "uuid";

export const handler = async (event: { BranchName: string }): Promise<any> => {
  try {
    console.log("event", event);

    const id = v4();

    const branchName = event.BranchName;
    if (branchName === "master") {
      console.log("Not deleting anything because this is the master branch.");
      return;
    }

    const client = new CloudFormationClient({ region: "us-east-1" });
    const lambdaStackName = `monster-week-${branchName}-Stack-Beta`;

    // Delete the pipeline stack
    const deletePipelineInput: DeleteStackCommandInput = {
      StackName: `monster-week-${branchName}`,
    };
    let deletePipelineCommand = new DeleteStackCommand(deletePipelineInput);

    console.log("attempt #1 to delete the stack");
    // Attempt to delete the edge stack
    let deleteDeployInput: DeleteStackCommandInput = {
      StackName: lambdaStackName,
      ClientRequestToken: id,
    };
    let deleteDeployCommand = new DeleteStackCommand(deleteDeployInput);

    await Promise.all([
      client.send(deletePipelineCommand),
      client.send(deleteDeployCommand),
    ]);

    const waitUntilStackDeleteInput: DescribeStacksCommandInput = {
      StackName: lambdaStackName,
    };
    const waiterConfig: WaiterConfiguration<CloudFormationClient> = {
      client,
      maxWaitTime: 300,
    };

    console.log("awaiting stack deletion");
    try {
      await waitUntilStackDeleteComplete(
        waiterConfig,
        waitUntilStackDeleteInput
      );

      console.log("Stack deleted");
    } catch (e) {
      console.log("Stack did not delete. Trying again.", e);
      // Attempt the delete again with the lambda@edge resource ignored.
      deleteDeployInput = {
        StackName: lambdaStackName,
        RetainResources: ["LambdaEdge"],
        ClientRequestToken: id,
      };
      deleteDeployCommand = new DeleteStackCommand(deleteDeployInput);
      await client.send(deleteDeployCommand);
    }

    console.log("All stacks deleted. Good bye.");

    return;
  } catch (e) {
    console.log("It broke", e);
    throw e;
  }
};
