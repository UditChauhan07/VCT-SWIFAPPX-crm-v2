import { API_BASE_URL } from '@/config/serverApiConfig';
const authKey = 'auth';

export default async function GetAdminDataHandler({ token, user_id }) {
  let headersList = {
    Accept: '*/*',
    Authorization: `Bearer ${token}`,
  };

  let response = await fetch(`${API_BASE_URL}admin/read/${user_id}`, {
    method: 'GET',
    headers: headersList,
  });

  let data = JSON.parse(await response.text());
  return data;
}

export const getLocalUserData = JSON.parse(localStorage.getItem(authKey) ?? '{}');
