interface IParameter {
  endpoint: string;
  method: string;
  data?: any;
  token: string;
}

async function send({ endpoint, method, data, token }: IParameter) {
  const opts: RequestInit = { method, headers: {}, body: null };

  if (data) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(data);
  }

  if (token) {
    opts.headers['Authorization'] = `Token ${token}`;
  }

  return fetch(`${endpoint}`, opts)
    .then((r) => r.text())
    .then((json) => {
      try {
        return JSON.parse(json);
      } catch (err) {
        return json;
      }
    });
}

export function get(endpoint: string, token?: string) {
  return send({ endpoint, method: 'GET', token });
}

export function del(endpoint: string, token?: string) {
  return send({ endpoint, method: 'DELETE', token });
}

export function post(endpoint: string, data: any, token?: string) {
  return send({ endpoint, method: 'POST', data, token });
}

export function put(endpoint: string, data: any, token?: string) {
  return send({ endpoint, method: 'PUT', data, token });
}
