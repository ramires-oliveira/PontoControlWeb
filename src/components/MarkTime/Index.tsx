import { MarkTimeContainer } from "./styles";

interface MarkTimeProps {
  time: string;
  orderMark: string;
}

export function MarkTime({ time, orderMark }: MarkTimeProps) {
  return (
    <MarkTimeContainer>
      <span className="time">{time}</span>
      <span className="orderMark">{orderMark}</span>
    </MarkTimeContainer>
  );
}

export default MarkTime;
