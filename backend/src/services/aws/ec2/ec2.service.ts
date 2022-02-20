import {
  EC2Client,
  RunInstancesCommand,
  CreateKeyPairCommand,
  CreateTagsCommand,
  DescribeInstancesCommand,
  waitUntilInstanceRunning,
  Reservation,
  Instance,
} from '@aws-sdk/client-ec2';
import { InstanceDefaultParam } from '~/common/enums/enums';

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
    const data = await this.#ec2Client.send(
      new RunInstancesCommand({
        ImageId: imageId,
        InstanceType: InstanceDefaultParam.INSTANCE_TYPE as string,
        MinCount: 1,
        MaxCount: 1,
        KeyName: keyName,
      }),
    );

    const [instance] = data.Instances as Instance[];
    const { InstanceId: instanceId } = instance;

    await this.#ec2Client.send(
      new CreateTagsCommand({
        Resources: [instanceId as string],
        Tags: [
          {
            Key: 'Name',
            Value: name,
          },
        ],
      }),
    );

    await waitUntilInstanceRunning(
      {
        client: this.#ec2Client,
        maxWaitTime: InstanceDefaultParam.MAX_WAITING_TIME as number,
      },
      {
        InstanceIds: [instanceId as string],
      },
    );

    const dataWithDNS = await this.#ec2Client.send(
      new DescribeInstancesCommand({ InstanceIds: [instanceId as string] }),
    );

    const [reservation] = dataWithDNS.Reservations as Reservation[];
    const [instanceWithDNS] = reservation.Instances as Instance[];
    const { PublicDnsName: publicDnsName } = instanceWithDNS;

    return {
      instanceId: instanceId as string,
      hostname: publicDnsName as string,
    };
  }
}

export { EC2 };
