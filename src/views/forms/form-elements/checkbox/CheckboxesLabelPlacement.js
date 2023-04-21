// ** MUI Imports
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

const CheckboxesLabelPlacement = (valueYes, valueNo) => {
  return (
    <div>
      <FormGroup row>
        <FormControlLabel defaultChecked  label='Sim' labelPlacement='top' control={<Checkbox checked={valueYes || true}/>} />
        <FormControlLabel label='Não' labelPlacement='top' control={<Checkbox checked={valueNo}/>} />
      </FormGroup>
    </div>
  )
}

export default CheckboxesLabelPlacement
