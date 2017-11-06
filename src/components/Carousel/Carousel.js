import React from 'react';
// import ReactDOM from 'react-dom'
import { Carousel } from 'react-bootstrap'
import "./Carousel.css";

class CarouselHome extends React.Component {
  render() {
    return (
      <Carousel>
    <Carousel.Item>
      <img width={900} height={500} alt="caregiver" src="http://18672-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2015/12/BoomerWomanHuggingMother_SA.jpg" />
      <Carousel.Caption>
        <h1>Nulla vitae elit libero, a pharetra augue mollis interdum.</h1>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img width={900} height={500} alt="caregiver" src="https://www.bayshore.ca/wp-content/uploads/2014/06/iStock_000017530512Large.jpg" />
      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>

      <img width={900} height={500} alt="caregiver" src="https://www.vhl.org/wp-content/uploads/2015/11/Caregiver-center.jpg" />
      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
    );
  }
} 

export default CarouselHome;