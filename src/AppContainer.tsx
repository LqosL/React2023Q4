import { ReactNode } from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function AppContainer(): ReactNode {
  // const [searchInputState, setSearchInputState]: [
  //   string,
  //   React.Dispatch<React.SetStateAction<string>>,
  // ] = useState('hello');
  // const [results, setResults]: [
  //   Array<Result>,
  //   React.Dispatch<React.SetStateAction<Array<Result>>>,
  // ] = useState<Array<Result>>([]);

  // function proxySetSearch(search: string) {
  //   setSearchInputState(search);
  // }

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
