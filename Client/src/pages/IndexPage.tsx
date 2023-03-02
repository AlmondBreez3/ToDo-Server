import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { getCookie } from '../cookie';
import axios from 'axios';
import { useQuery } from 'react-query';

export default function IndexPage() {
  const accessApi = axios.create({
    baseURL: `http://localhost:4000`,
    headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
  });

  const cookie = getCookie('accessToken');

  async function findUser() {
    const response = await accessApi.get('/userInfo');
    return response.data;
  }
  const { data } = useQuery(['user'], findUser);
  console.log(data);

  if (!cookie) {
    return (
      <>
        <Box>
          Index Page Here
          <br />
          <Link to={'/login'}>Login</Link>
        </Box>
        <br />
        <div>a</div>
      </>
    );
  } else {
    return (
      <Box>
        환영합니다 {data?.name}님<Link to="/todo">Todo list바로가기</Link>
      </Box>
    );
  }
}

const Box = styled.div`
  font-size: 90px;
  background-color: aliceblue;
`;
