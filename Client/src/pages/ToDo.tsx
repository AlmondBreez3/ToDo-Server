import styled from '@emotion/styled';
import axios from 'axios';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getCookie } from '../cookie';

interface TodoType {
  id: number;
  todo: string;
}

export default function ToDo() {
  const [comment, setComment] = useState('');
  const accessApi = axios.create({
    baseURL: `http://localhost:4000`,
    headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
  });

  async function findTodo() {
    const response = await accessApi.get('/comment');
    return response.data;
  }

  const { data } = useQuery(['todo'], findTodo);
  console.log(data[0]?.todos);
  const list = data[0]?.todos;

  const addTodo = async (newTodo: string): Promise<any> => {
    const response = await accessApi.post<string>(`/addComment`, {
      //id: Math.floor(Math.random() * 100),
      todos: newTodo,
    });
    return response;
  };

  const { mutate } = useMutation(addTodo);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate(comment);
  };
  return (
    <Container>
      <Box>
        <Text>To do list</Text>
        <InputBox>
          <Input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></Input>
          <button onClick={handleSubmit}></button>
        </InputBox>
        <Comment>{list && list.map((a: any) => <a>{a}</a>)}</Comment>

        <Comment></Comment>
      </Box>
    </Container>
  );
}
const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
  font-size: 100px;
`;
const Container = styled.div`
  display: flex;
  padding: 100px;
  justify-content: space-around;
`;
const Comment = styled.div`
  width: 100%;
  margin: 10px;
  height: 580px;
  border: 6px solid white;
`;

const Box = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 0 24px;
  max-width: 450px;
  background: pink;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Text = styled.div`
  font-size: 100px;
  color: white;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  font-size: large;
`;
