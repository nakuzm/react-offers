import { useNavigate } from 'react-router-dom';
import React from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import './Registration.scss';

export default function Registration(): JSX.Element {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const submit = (data: any) => {
    const {email, phoneNumber} = data;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, phoneNumber: { prefix: phoneNumber.slice(0, 3), number: phoneNumber.slice(3) } })
    };

    fetch('http://localhost:8080/api/register', requestOptions)
      .then(async response => {
        if (!response.ok) {
          return Promise.reject(response.status);
        }
        const {customerId} = await response.json();
        navigate({
          pathname: '/offers',
          search: `?customer-id=${customerId}`,
        });
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="registration-container">
        <h3 className="registration-title">Registration</h3>
        <div className="registration-desc">Please add your phone & email so we match you with the best partners.</div>
        <FloatingLabel
          controlId="phoneNumber"
          className="custom-form-floating"
          label="Mobile phone"
        >
          <Form.Control
            type="text"
            className="custom-form-control"
            placeholder="Mobile phone"
            isInvalid={errors.phoneNumber}
            {...register("phoneNumber", {
              required: true,
              pattern: /^(\+84)(3|6|9){1}[0-9]{8}$/
            })}
          />
        </FloatingLabel>
        {errors.phoneNumber?.type === 'required' && <span className="invalid-feedback custom-invalid-feedback">Mobile phone is required</span>}
        {errors.phoneNumber?.type === 'pattern' && <span className="invalid-feedback custom-invalid-feedback">Mobile phone is invalid</span>}

        <FloatingLabel
          controlId="email"
          label="Email"
          className="custom-form-floating"
        >
          <Form.Control
            type="text"
            placeholder="Email"
            className="custom-form-control"
            isInvalid={errors.email}
            {...register("email", {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
            })}
          />
        </FloatingLabel>
        {errors.email?.type === 'required' && <span className="invalid-feedback custom-invalid-feedback">Email is required</span>}
        {errors.email?.type === 'pattern' && <span className="invalid-feedback custom-invalid-feedback">Email is invalid</span>}

        <Form.Check
          type="switch"
          id="advertising"
          className="custom-form-check d-flex align-items-center"
          label="I agree to receive advertising information"
        />

        <Button variant="primary" type="submit" className="custom-button">Register</Button>

        <div className="registration-terms">By clicking on "Sign up" above, customers confirm to have read and agree to the terms and conditions & privacy policy of the  company</div>

      </div>
    </form>
  );
}
