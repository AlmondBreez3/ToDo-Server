import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getCookie } from '../cookie';

export default function MyPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const queryClient = useQueryClient();
  const accessApi = axios.create({
    baseURL: `http://localhost:4000`,
    headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
  });
  async function findMyPage() {
    const response = await accessApi.get('/mypage');
    return response.data;
  }
  const { data } = useQuery(['myPage'], findMyPage);
  console.log(data);

  useEffect(() => {
    if (data != undefined) {
      setEmail(data.email);
      setName(data.name);
      setUrl(data.profileurl);
    }
  }, [data]);

  const saveMyPage = async (): Promise<any> => {
    const response = await accessApi.post<string>(`/myPage/save`, {
      //id: Math.floor(Math.random() * 100),
      name: name,
      email: email,
      profileurl: url,
    });
    console.log(response);
    return response;
  };

  const { mutate } = useMutation(() => saveMyPage(), {
    onError: () => {
      console.log('error');
    },
  });

  const changeInfo = async (): Promise<any> => {
    const response = await accessApi.put<string>(`/mypage/change`, {
      //id: Math.floor(Math.random() * 100),
      name: name,
      email: email,
      profileurl: url,
    });
    console.log(response);
    return response;
  };

  const { mutate: change } = useMutation(changeInfo, {
    onSuccess: () => {
      console.log('succsss');
      queryClient.invalidateQueries(['myPage']);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate(e);
    console.log(email);
    console.log(name);
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    change(e);
  };

  return (
    <Container>
      <Box>
        <Text>마이 페이지</Text>
        <Text>정보 수정</Text>
      </Box>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>
        <button></button>
      </form>
      <Box>
        {data !== undefined ? (
          <div>
            <div>{data?.name}</div>
            <div>{data?.email}</div>
            <div>{data?.profileurl}</div>
          </div>
        ) : (
          <div>새로운 정보를 입력하세요</div>
        )}
      </Box>
      <form onSubmit={handleChange}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>
        <button></button>
      </form>
    </Container>
  );
}

const Text = styled.div`
  font-size: 50px;
`;

const Container = styled.div`
  display: flex;
  padding: 100px;
  justify-content: space-around;
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
