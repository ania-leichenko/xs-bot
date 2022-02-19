import {
  Instance,
  Reservation,
  RunInstancesCommand,
  CreateKeyPairCommand,
  CreateTagsCommand,
  DescribeInstancesCommand,
  waitUntilInstanceRunning,
} from '@aws-sdk/client-ec2';
import { ec2Client as ec2ClientServ } from '~/services/services';

type Constructor = {
  ec2ClientService: typeof ec2ClientServ;
};

type InstanceResponse = {
  hostname: string;
  instanceId: string;
};

type InstanceCredentials = {
  name: string;
  keyName: string;
  imageId: string;
};

type KeyPair = {
  name: string;
  keyMaterial: string;
};

class AWSEc2 {
  #ec2ClientService: typeof ec2ClientServ;

  constructor({ ec2ClientService }: Constructor) {
    this.#ec2ClientService = ec2ClientService;
  }

  public async createKeyPair(name: string): Promise<KeyPair> {
    const key = await this.#ec2ClientService.send(
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
  }: InstanceCredentials): Promise<InstanceResponse> {
    const instanceParams = {
      ImageId: imageId,
      InstanceType: 't2.micro',
      MinCount: 1,
      MaxCount: 1,
      KeyName: keyName,
    };

    const data = await this.#ec2ClientService.send(
      new RunInstancesCommand(instanceParams),
    );

    const instanceId = (data.Instances as Instance[])[0].InstanceId as string;

    const tagParams = {
      Resources: [instanceId],
      Tags: [
        {
          Key: 'Name',
          Value: name,
        },
      ],
    };

    await this.#ec2ClientService.send(new CreateTagsCommand(tagParams));

    await waitUntilInstanceRunning(
      { client: this.#ec2ClientService, maxWaitTime: 90 },
      { InstanceIds: [instanceId] },
    );

    const fullData = await this.#ec2ClientService.send(
      new DescribeInstancesCommand({ InstanceIds: [instanceId] }),
    );

    const reservation = (fullData.Reservations as Reservation[])[0];
    const instance = (reservation.Instances as Instance[])[0];

    return {
      hostname: instance.PublicDnsName as string,
      instanceId: instance.InstanceId as string,
    };
  }
}

export { AWSEc2 };
