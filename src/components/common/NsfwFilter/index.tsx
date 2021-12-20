import { ChangeEvent } from "react";
import { useQueryParam, withDefault, BooleanParam } from "use-query-params";
// ui
import { FormControl, FormLabel, Switch } from "@chakra-ui/react";

export function NsfwFilter() {
  const [isOn, setIsOn] = useQueryParam("nsfw", withDefault(BooleanParam, false));
  const onNsfwChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsOn(e.target.checked || undefined, "replaceIn");
  };

  return (
    <>
      <FormControl display="flex" alignItems="center" justifyContent="center">
        <FormLabel htmlFor="isNsfw" m="0 6px 0 0" fontSize="xs" userSelect="none">
          Show NSFW content
        </FormLabel>
        <Switch id="isNsfw" size="sm" defaultChecked={isOn} value={isOn ? 1 : 0} onChange={onNsfwChange} />
      </FormControl>
    </>
  );
}
