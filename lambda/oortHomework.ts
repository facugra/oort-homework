import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";

const ec2Client = new EC2Client({ region: "us-east-1" });

export const handler = async (event, context) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      sortDirection = "asc",
      sortBy = "InstanceId",
    } = JSON.parse(event.body);

    // Retrieve EC2 instances
    const describeInstancesCommand = new DescribeInstancesCommand({});
    const instancesResponse = await ec2Client.send(describeInstancesCommand);

    // Map instances to flat objects
    const mappedInstances = instancesResponse.Reservations.reduce(
      (acc, reservation) => {
        const instances = reservation.Instances.map((instance) => {
          const instanceNameTag = instance.Tags.find(
            (tag) => tag.Key === "Name"
          );
          const instanceName = instanceNameTag ? instanceNameTag.Value : "";
          return {
            InstanceId: instance.InstanceId,
            Name: instanceName,
            PrivateIpAddress: instance.PrivateIpAddress,
            PublicIpAddress: instance.PublicIpAddress,
            AvailabilityZone: instance.Placement.AvailabilityZone,
            State: instance.State.Name,
            InstanceType: instance.InstanceType,
          };
        });
        return acc.concat(instances);
      },
      []
    );

    // Sort using event's criteria
    const sortedAndPagedInstances = mappedInstances
      .sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        const sortMultiplier = sortDirection === "asc" ? 1 : -1;
        if (aValue < bValue) return -1 * sortMultiplier;
        if (aValue > bValue) return 1 * sortMultiplier;
        return 0;
      })
      // Get current page
      .slice((page - 1) * pageSize, page * pageSize);

    return {
      statusCode: 200,
      body: JSON.stringify({
        list: sortedAndPagedInstances,
        count: mappedInstances.length,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
