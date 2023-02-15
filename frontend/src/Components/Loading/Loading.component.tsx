import { InfinitySpin } from 'react-loader-spinner';
import './Loading.styles.css';

export const Loading = () => {
  return (
    <div>
      <h1 className='loading-text'>Loading...</h1>
      <InfinitySpin color='white' />
    </div>
  );
};
