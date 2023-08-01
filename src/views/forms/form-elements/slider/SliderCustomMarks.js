// ** MUI Imports
import Slider from '@mui/material/Slider'


let m = [
  {
    value: 0,
    label: '0°'
  },
  {
    value: 20,
    label: '20°'
  },
  {
    value: 37,
    label: '37°'
  },
  {
    value: 100,
    label: '100°'
  }
]


const SliderCustomMarks = ({ marks, defaultValue, step, variable, min, max, valueLabelFormat, value, onChange }) => {
  if (!!marks) m = marks
  return (

    <Slider
      step={step !== undefined ? step : 200}
      marks={m}
      defaultValue={defaultValue || 20}
      valueLabelDisplay='auto'
      getAriaValueText={value => `${value}${variable !== undefined ? variable : '°C'}`}
      aria-labelledby='custom-marks-slider'
      min={min || undefined}
      max={max || undefined}
      valueLabelFormat={valueLabelFormat || undefined}
      onChange={onChange}
      value={value}
    />
  )
}

export default SliderCustomMarks
