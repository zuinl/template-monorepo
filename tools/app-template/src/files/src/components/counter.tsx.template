import { Button } from "@libs/design-system";
import { useAppContext } from "../contexts";

export function Counter() {
  const { useCount } = useAppContext();

  return <Button onClick={useCount.onCountClick}>Clicked {useCount.count} times</Button>;
}
