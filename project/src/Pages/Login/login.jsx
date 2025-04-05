import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import loginImage from '../../assets/login-image.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import './Login.css'; // 👈 Custom styles here

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Invalid password';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(login(formData));
    navigate('/home');
  };

  return (
    <Container className="login-container">
    <Row className="align-items-center justify-content-center">
      {/* Left Column: Login Form */}
      <Col md={4} lg={5}>
        <div className="login-box">
          <h2 className="login-title">Sign In</h2>
          <p className="login-subtext">
            New user? <a href="/register">Create an account</a>
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                name="email"
                placeholder="Username or email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password === 'Password is required' ? errors.password : 
                'Password must be minimum 8 characters long (must contain at least 1 capital letter, 1 number & 1 symbol)'}
              </Form.Control.Feedback>
            </Form.Group>
  
            <div className="d-flex align-items-center mb-3">
              <input type="checkbox" className="me-2 large-checkbox" />
              <label>Keep me signed in</label>
            </div>
  
            <Button variant="dark" type="submit" className="w-100 mb-3">
              Sign In
            </Button>
  
            <div className="divider-text">Or Sign In With</div>
  
            <div className="social-icons mt-2">
              <i className="fab fa-google"></i>
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-linkedin-in"></i>
              <i className="fab fa-twitter"></i>
            </div>
            
          </Form>
        </div>
      </Col>
  
      {/* Right Column: Image */}
      <Col md={6} lg={6} className="text-center">
        <img
          src={loginImage}
          alt="Login illustration"
          className="img-fluid login-image"
        />
      </Col>
    </Row>
  </Container>
  
  );
};

export default Login;
