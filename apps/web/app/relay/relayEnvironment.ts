import {
  Store,
  RecordSource,
  Environment,
  Network,
  Observable,
  RequestParameters,
  Variables,
} from 'relay-runtime';
import { config } from '../config';

const getToken = () => {
  const token = localStorage.getItem('bro-token');
  return token ?? '';
};

const fetchFunction = (params: RequestParameters, variables: Variables) => {
  const response = fetch(config.GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: getToken(),
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  return Observable.from(response.then((data) => data.json()));
};

export const createEnvironment = () => {
  const network = Network.create(fetchFunction);
  const store = new Store(new RecordSource());
  return new Environment({ store, network });
};
