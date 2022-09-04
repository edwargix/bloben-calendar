import { ITEM_SIZE } from '../../types/enums';
import { Select } from 'chakra-react-select';
import { timezones } from '../../utils/timezones';
import { useEffect, useState } from 'react';

interface ChakraTimezoneSelectProps {
  onSelect: any;
  value: string;
  size?: ITEM_SIZE;
  isDisabled?: boolean;
}
const ChakraTimezoneSelect = (props: ChakraTimezoneSelectProps) => {
  const [zones, setZones] = useState<any>([]);

  useEffect(() => {
    const data: any = timezones.map((item: string) => ({
      label: item,
      value: item,
    }));

    setZones(data);
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Select
        id="timezone-select"
        name="timezones"
        options={zones ? zones : []}
        value={{ label: props.value, value: props.value }}
        closeMenuOnSelect={true}
        onChange={props.onSelect}
        size={props.size}
        isDisabled={props.isDisabled}
      />
    </div>
  );
};

export default ChakraTimezoneSelect;
