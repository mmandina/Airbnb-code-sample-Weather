import { render, screen } from '@testing-library/react';
import { Loading } from './Loading.component';

describe('Loading component', () => {
  it('renders without crashing', () => {
    render(<Loading />);
    const loadingText = screen.getByText(/Loading.../i);
    expect(loadingText).toBeInTheDocument();
  });

  it('renders the correct elements', () => {
    render(<Loading />);
    const loadingText = screen.getByText(/Loading.../i);
    const infinitySpin = screen.getByTestId('infinity-spin');
    expect(infinitySpin).toBeInTheDocument();
    expect(loadingText).toBeInTheDocument();
  });
});
