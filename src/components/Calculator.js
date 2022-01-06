import React, { useState } from 'react'

const toCelsius = (fahrenheit) => ((fahrenheit - 32) * 5 / 9)
const toFahrenheit = (celsius) => ((celsius * 9 / 5) + 32)

const tryConvert = (temperature, convert) => {
  const input = parseFloat(temperature)
  if (Number.isNaN(input)) {
    return ''
  }
  const output = convert(input)
  const rounded = Math.round(output * 1000) / 1000
  return rounded.toString()
}

export function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>
  }
  return <p>The water would not boil.</p>
}

export function TemperatureInput(props) {
  const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
  }

  function handleChange(e) {
    props.onTemperatureChange(e.target.value)
  }

  return (
    <fieldset>
      <legend>Enter temperature in {scaleNames[props.scale]}: </legend>
      <input value={props.temperature} onChange={handleChange} />
    </fieldset>
  )
}

export function Calculator() {
  const [temperature, setTemperature] = useState('')
  const [scale, setScale] = useState('c')

  function handleCelsiusChange(temperature) {
    setTemperature(temperature)
    setScale('c')
  }

  function handleFahrenheitChange(temperature) {
    setTemperature(temperature)
    setScale('f')
  }

  const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature
  const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature

  return (
    <div>
      <TemperatureInput
        scale="c"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />
      <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />
      <BoilingVerdict celsius={parseFloat(celsius)} />
    </div>
  )
}
