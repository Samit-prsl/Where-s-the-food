import { createContext } from 'react';

const BASE_URI = import.meta.env.VITE_BACKEND_URL;


const SecureReqContext = createContext({
  post: async () => {
    throw new Error('SecureReqContext not yet initialized');
  },
  get: async () => {
    throw new Error('SecureReqContext not yet initialized');
  },
  put: async () => {
    throw new Error('SecureReqContext not yet initialized');
  },
  delete: async () => {
    throw new Error('SecureReqContext not yet initialized');
  },
  upload: async () => {
    throw new Error('SecureReqContext not yet initialized');
  },
});

export const SecureReqProvider = ({
  children,
}) => {
  const post = async (url, body) => {
    const token = localStorage.getItem('token')
    const conf = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body),
    };
console.log(conf);

    const response = await fetch(`${BASE_URI}/api/${url}`, conf);
    if (response.ok) {
      return response.json();
    }
    throw new Error('Request failed');
  };

  const get = async url => {
    const token = localStorage.getItem('token')
    const conf = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    const response = await fetch(`${BASE_URI}/${url}`, conf);

    if (response.ok) {
      return response.json();
    }
    throw new Error('Request failed');
  };
  const put = async (url, body) => {
    const token = localStorage.getItem('token')
    const conf = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(`${BASE_URI}/${url}`, conf);

    if (response.ok) {
      return response.json();
    }
    throw new Error('Request failed');
  };

  const deleteRequest = async url => {
    const token = localStorage.getItem('token')
    const conf = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    };

    const response = await fetch(`${BASE_URI}/${url}`, conf);

    if (response.ok) {
      return response.json();
    }

    throw new Error('Request failed');
  };

  const upload = async (
    url,
    body
  ) => {
    const token = localStorage.getItem('token')
    const conf = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body,
    };

    const response = await fetch(`${BASE_URI}/${url}`, conf);

    if (response.ok) {
      return response.json();
    }

    throw new Error('Request failed');
  };

  return (
    <SecureReqContext.Provider
      value={{ post, get, put, delete: deleteRequest, upload }}
    >
      {children}
    </SecureReqContext.Provider>
  );
};

export default SecureReqContext;
