import Select from "./components/Select";

interface Iselect{
  options:any[]
  label: string
  api:any
}

export default function renderSelect({options, label, api={}}:Iselect) {
  return <Select label={label} options={options}  api={api}/>;
}