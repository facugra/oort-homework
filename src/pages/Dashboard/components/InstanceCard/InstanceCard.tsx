import styled from "styled-components";
import Badge from "../../../../components/Badge";
import GenericCard from "../../../../components/Card";
import { Instance } from "../../../../types/Instance";

const CardTitle = styled.h3`
  font-size: 18px;
`;

const CardSubtitle = styled.h4`
  font-size: 14px;
  color: #888888;
`;

const TypeBadge = styled(Badge)`
  background-color: #a4c4f9;
`;

const AZBadge = styled(Badge)`
  background-color: #f093c3;
`;

const Card = styled(GenericCard)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;

  * {
    margin: 0;
  }
`;

interface Props {
  instance: Instance;
}

const InstanceCard = ({ instance }: Props) => {
  return (
    <Card>
      <span>
        <CardTitle data-testid="instanceName">{instance.Name}</CardTitle>
        <CardSubtitle>ID: {instance.InstanceId}</CardSubtitle>
      </span>
      <TypeBadge>Type: {instance.InstanceType}</TypeBadge>
      <AZBadge>AZ: {instance.AvailabilityZone}</AZBadge>
      <Badge state={instance.State}>State: {instance.State}</Badge>
      <p>
        <b>Public IP:</b> {instance.PublicIpAddress || "Unavailable"}
      </p>
      <p>
        <b>Private IP:</b> {instance.PrivateIpAddress}
      </p>
    </Card>
  );
};

export default InstanceCard;
