import {
  EC2Client,
  RunInstancesCommand,
  CreateKeyPairCommand,
  CreateTagsCommand,
  DescribeInstancesCommand,
  waitUntilInstanceRunning,
} from '@aws-sdk/client-ec2';
import {
  INSTANCE_TYPE,
  MAX_WAITING_TIME,
} from '~/common/constants/instance.constants';

type Constructor = {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
};

type KeyPair = {
  name: string;
  keyMaterial: string;
};

type InstanceCredentials = {
  name: string;
  keyName: string;
  imageId: string;
};

type InstanceData = {
  hostname: string;
  instanceId: string;
};

class EC2 {
  #ec2Client: EC2Client;

  constructor({ region, credentials }: Constructor) {
    this.#ec2Client = new EC2Client({
      region,
      credentials,
    });
  }

  public async createKeyPair(name: string): Promise<KeyPair> {
    const key = await this.#ec2Client.send(
      new CreateKeyPairCommand({ KeyName: name }),
    );

    return {
      name: key.KeyName as string,
      keyMaterial: key.KeyMaterial as string,
    };
  }

  public async createInstance({
    name,
    keyName,
    imageId,
  }: InstanceCredentials): Promise<InstanceData> {
    const instanceParams = {
      ImageId: imageId,
      InstanceType: INSTANCE_TYPE,
      MinCount: 1,
      MaxCount: 1,
      KeyName: keyName,
    };

    const data = await this.#ec2Client.send(
      new RunInstancesCommand(instanceParams),
    );

    const instanceId = data.Instances![0].InstanceId as string;

    const tagParams = {
      Resources: [instanceId],
      Tags: [
        {
          Key: 'Name',
          Value: name,
        },
      ],
    };

    await this.#ec2Client.send(new CreateTagsCommand(tagParams));

    await waitUntilInstanceRunning(
      {
        client: this.#ec2Client,
        maxWaitTime: MAX_WAITING_TIME,
      },
      {
        InstanceIds: [instanceId],
      },
    );

    const dataWithDNS = await this.#ec2Client.send(
      new DescribeInstancesCommand({ InstanceIds: [instanceId] }),
    );

    const publicDnsName = dataWithDNS.Reservations![0].Instances![0]
      .PublicDnsName as string;

    return {
      instanceId,
      hostname: publicDnsName,
    };
  }
}

export { EC2 };
