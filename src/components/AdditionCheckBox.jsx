import { FormGroup, Label, Input } from 'reactstrap';

export default function AdditionCheckBox({ additions, onChange, value, invalid }) {

  return (
    <FormGroup
      check
      inline
    >
      <Label check>
        <Input type="checkbox" name="additions" onChange={onChange} checked={additions.includes(value)} value={value} invalid={invalid} />{' '}{value}
      </Label>
    </FormGroup>
  );
}