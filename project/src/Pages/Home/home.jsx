import React, { useEffect, useRef } from 'react';
import './home.css';
import { Container, Row, Col, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, setFilter, selectFilteredCountries, incrementDisplayCount } from '../../redux/homeSlice';
import loginImage from '/src/assets/media.png';
const Home = () => {
  const dispatch = useDispatch();
  const slider = useRef(null);
  const countries = useSelector(selectFilteredCountries);
  const filter = useSelector(state => state.countries.filter);
  const status = useSelector(state => state.countries.status);
  const error = useSelector(state => state.countries.error);
  const displayCount = useSelector(state => state.countries.displayCount);
  const allCountries = useSelector(state => 
    state.countries.data.filter(c => 
      state.countries.filter === 'All' ? true : c.region === state.countries.filter
    )
  );

  const initialFetchDone = useRef(false);

  useEffect(() => {
    if (!initialFetchDone.current) {
      dispatch(fetchCountries());
      initialFetchDone.current = true;
    }
  }, [dispatch]);

  const handleFilterChange = (region) => {
    dispatch(setFilter(region));
  };

  const renderLoading = () => (
    <Container className="text-center py-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </Container>
  );

  const renderError = () => (
    <Container className="text-center py-5">
      <div className="alert alert-danger" role="alert">
        Error: {error}
      </div>
    </Container>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    className: 'slider-container',
    dotsClass: 'slick-dots',
    appendDots: dots => (
      <div className="slick-dots-and-arrows">
        <div className="arrow-btn" onClick={() => slider.current.slickPrev()}>←</div>
        <div className="dots-wrapper">{dots}</div>
        <div className="arrow-btn" onClick={() => slider.current.slickNext()}>→</div>
      </div>
    )

    
    
    
  };

  const slides = [
    { image: loginImage },
    { image: loginImage },
    { image: loginImage },
    { image: loginImage }
  ];

  return (
    <Container>
      <Navbar expand="md" className="mb-4">
        <Container fluid>
          <Navbar.Brand className="fw-bold">Countries</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {['All', 'Asia', 'Europe'].map((region) => (
                <Nav.Link
                  key={region}
                  active={filter === region}
                  onClick={() => handleFilterChange(region)}
                  className={`px-3 text-${filter === region ? 'dark' : 'secondary'}`}
                  style={filter === region ? { textDecoration: 'underline', textUnderlineOffset: '4px' } : {}}
                >
                  {region}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section className="text-center hero-section">
        <h2 className="fw-bold mb-4" style={{ letterSpacing: '4px' }}>WELCOME</h2>
        <Row className="g-4">
          <Col xs={12} md={8} className="order-md-1 order-2" style={{ height: '300px' }}>
            <Slider ref={slider} {...settings}>
              {slides.map((slide, index) => (
                <div key={index}>
                  <div className="slider-image-container" style={{ height: '100%' }}>
                    <img
                      src={slide.image}
                      alt={`Slide ${index + 1}`}
                      style={{ 
                        width: '90px',
                        height: '260px',
                        margin: '0 auto',
                        display: 'block',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </Col>
          <Col xs={12} md={4} className="order-md-2 order-1" style={{ height: '300px' }}>
            <div className="side-image-container" style={{ height: '100%' }}>
              <img
                  src={loginImage}
                  style={{ 
                    width: '90px',
                    height: '200px',
                    margin: '0 auto',
                    display: 'block',
                    objectFit: 'contain'
                  }}
                alt="Travel inspiration"
                className="side-image"
              />
            </div>
          </Col>
        </Row>
      </section>

      {/* Country Cards */}
      {status === 'loading' ? renderLoading() : status === 'failed' ? renderError() : (
        <Row xs={1} md={2} lg={2} className="g-4">
        {countries.map((country, idx) => (
          <Col key={country.name}>
            <div className="border rounded p-3 d-flex align-items-center">
              <div className="me-3">
                <img 
                  src={country.flag} 
                  alt={`${country.name} flag`} 
                  width={80} 
                  height={50} 
                  className="rounded object-fit-cover"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div>
                <h5 className="mb-1">{country.name}</h5>
                <span className="text-secondary">{country.region}</span>
              </div>
            </div>
          </Col>
        ))}
        </Row>
      )}
      {status === 'succeeded' && displayCount < allCountries.length && (
        <div className="text-center mt-5">
          <button 
            className="btn btn-dark px-4"
            onClick={() => dispatch(incrementDisplayCount())}
          >
            Load more
          </button>
        </div>
      )}
      <footer className="text-center mt-5">
        <div className="d-flex justify-content-center gap-3 my-3">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-linkedin-in"></i>
          <i className="fab fa-youtube"></i>
        </div>
        <p>Example@email.com </p>
        <p>Copyright © 2020 Name. All rights reserved.</p>
      </footer>
    </Container>
  );
};

export default Home;
