import styled from 'styled-components'
import { useState } from "react"
import Forecast from '../components/Forecast'

const cities = [
  'Los Angeles',
  'London',
  'New York City',
  'Paris',
  'Buenos Aires'
]


export default function Home({data}) {
  const [city, setCity] = useState("Los Angeles")
  console.log(data)
  
  return (
      <Wrapper>
      <Cities>
        { cities.map(c => (
          <Button selected={c === city} key={c} onClick={() => setCity(c)}>{c}</Button>
        ))}
π      </Cities>
      <ForecastWrapper>
        <Forecast data={data}/>
      </ForecastWrapper>
      </Wrapper>)
}

export async function getServerSideProps(context){
  // getting the api key from environment
  const key = process.env.WEATHER_API_KEY
  const city = cities[0]
  // one api is the actual weather api
  // then we can parametrized the environment variable api key the city
  const url=`http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`
  const response= await fetch(url)
  var data = await response.json()
  let fakeData = {
    key: "value",
    anotherKey: "anotherValue"
  }
  return {
    props: {data}
  }
}
const Cities = styled.div`
  padding-top: 25px;
  display: flex;
  gap: 10px;
  justify-content: center;
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ForecastWrapper = styled.div`
  flex: 1;
  margin: 50px;
  margin-top: 25px;
`

const Button = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1rem;
  padding: 5px;
  border-bottom: 2px solid ${(p) => p.selected? 'black' : 'transparent'} ;
  /* 
    a: it's a ternary operator. if p.selected is true, then the border-bottom will be black, otherwise it will be transparent.
   */
`