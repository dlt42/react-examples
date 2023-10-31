import { FC, useState } from 'react';

import Button from '../components/Button';
import CanvasWrapper, { DrawFunction } from '../components/CanvasWrapper';
import Container from '../components/Container';
import Description from '../components/Description';
import Details from '../components/Details';
import Header from '../components/Header';
import Section from '../components/Section';
import Counter from '../examples/hooks/counter/Counter';
import Expression from '../examples/hooks/expression/Expression';

const ExamplesPage: FC = (): JSX.Element => {
  const [toggle, setToggle] = useState(false);

  const draw: DrawFunction = (context, _, frameCount) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = `#000000`;
    context.beginPath();
    context.arc(
      context.canvas.width / 2,
      context.canvas.height / 2,
      20 * Math.sin(frameCount.value * 0.05) ** 2,
      0,
      2 * Math.PI
    );
    context.fill();
  };
  return (
    <>
      <header>
        <Header title='Examples' />
      </header>
      <main>
        <Section>
          <Description text='Example: Counter' />
          <Details
            label='Details'
            content={[
              'Uses the following hooks:',
              ['useEffect', 'useState', 'useReducer'],
            ]}
          />
          <Container>
            <Counter initialCounterValue={-5} />
          </Container>
        </Section>
        <Section>
          <Description text='Example: Expression editor' />
          <Details
            label='Details'
            content={[
              'Uses the following hooks:',
              [
                'useCallback',
                'useReducer',
                'useState',
                'memo',
                'useInput (custom hook)',
              ],
            ]}
          />
          <Container>
            <Button
              onClick={() => setToggle((toggle: boolean): boolean => !toggle)}
            >
              Change Prop
            </Button>
            <Expression initial='1+2*-5' toggle={toggle} />
          </Container>
        </Section>
        <Section>
          <Description text='Example: Simple animation' />
          <Details
            label='Details'
            content={['Uses a wrapped canvas component']}
          />
          <Container>
            <CanvasWrapper draw={draw} width={200} height={200} />
          </Container>
        </Section>
      </main>
    </>
  );
};

export default ExamplesPage;
