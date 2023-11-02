import { FC } from 'react';

import Container from '../Container/Container';
import { DetailsProps } from './Details.types';

const Details: FC<DetailsProps> = ({ label, content }): JSX.Element => (
  <details>
    <summary className='cursor-pointer text-xs'>{label}</summary>
    <Container classes='bg-gray-200'>
      <div className='text-xs'>
        {content.map((current, index) => (
          <div key={index}>
            {(Array.isArray(current) && (
              <ul className='list-disc ps-10 text-left'>
                {current.map((item, itemIndex) => (
                  <li key={`${index}-${itemIndex}`}>{item}</li>
                ))}
              </ul>
            )) ||
              (!Array.isArray(current) && <p>{current}</p>)}
          </div>
        ))}
      </div>
    </Container>
  </details>
);

export default Details;
