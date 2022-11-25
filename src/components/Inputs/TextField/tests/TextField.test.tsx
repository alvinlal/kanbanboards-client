/*
    Requirements:-
    1. Should match snapshot
*/

import renderer from 'react-test-renderer';
import TextField from '../TextField';

describe('TextField.tsx', () => {
  it('Should match snapshot', () => {
    const tree = renderer.create(<TextField type="text" error={false} />);

    expect(tree).toMatchSnapshot();
  });
});
