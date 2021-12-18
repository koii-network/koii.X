import { useState } from "react";
import { useQueryParam, StringParam, withDefault } from "use-query-params";
// ui
import { Flex } from "@chakra-ui/react";
import { ToggleButtonGroup, ToggleButton } from "components/buttons";

export function TimeFilter() {
  const [timeframe, setTimeframe] = useQueryParam<string>("t", withDefault(StringParam, "1w"));
  const [value, setValue] = useState(timeframe);

  const onTimeframeChange = (newValue: string) => {
    setTimeframe(newValue, "replaceIn");
    setValue(newValue);
  };

  return (
    <Flex justify="center">
      <ToggleButtonGroup size="xs" value={value} defaultValue={timeframe} onChange={onTimeframeChange} name="timeframe" isAttached variant="outline" aria-label="Change timeframe">
        <ToggleButton value="24h" aria-label="24 hours" children="24h" />
        <ToggleButton value="1w" aria-label="1 week" children="1w" />
        <ToggleButton value="1m" aria-label="1 month" children="1m" />
        <ToggleButton value="1y" aria-label="1 year" children="1y" />
        <ToggleButton value="all" aria-label="all time" children="all" />
      </ToggleButtonGroup>
    </Flex>
  );
}
