import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [nickname, setNickname] = useState('');
  const [payload, setPayload] = useState({
    email: '',
    pw: '',
    name: '',
  });

  // useEffect(() => {
  //   if (payload !== null) {
  //     setPayload({ name: nickname, email: email, pw: pw });
  //   }
  // }, [email, pw, nickname]);
  // console.log(setPayload);

  async function registerUser(ev: any) {
    ev.preventDefault();
    try {
      await axios.post('/register', { name: nickname, email: email, pw: pw });
      alert('가입 성공');
    } catch (e) {
      alert('가입 실패');
    }
  }

  return (
    <>
      <Form onSubmit={registerUser}>
        <Input
          type={'text'}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Nickname"
          value={nickname}
        ></Input>
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
