import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Add from '../components/Add/Add';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Add />, div);
});
