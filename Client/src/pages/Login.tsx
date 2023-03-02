import styled from '@emotion/styled';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from '../cookie';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  async function loginUser(ev: any) {
    ev.preventDefault();
    try {
      const response = await axios.post('/login', { email: email, pw: pw });
      alert('가입 성공');
      console.log(response);
      setCookie('accessToken', response.data.token);
      console.log(getCookie('accessToken'));
      navigate('/');
    } catch (e) {
      alert('가입 실패');
    }
  }

  return (
    <>
      <Link to={'/register'}>Register</Link>
      <Form onSubmit={loginUser}>
        <Input
          type={'email'}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="youremail@email.com"
          value={email}
        ></Input>
        <Input
          type={'password'}
          onChange={(e) => setPw(e.target.value)}
          placeholder="password"
          value={pw}
        ></Input>
        <button>Register</button>
      </Form>
    </>
  );
}

const Input = styled.input`
  width: 100%;
  background-color: light grey;
  height: 50px;
  font-size: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Form = styled.form``;
