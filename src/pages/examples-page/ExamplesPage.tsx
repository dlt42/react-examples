import { FC, useState } from 'react';

import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Description from '../../components/Description/Description';
import Details from '../../components/Details/Details';
import Header from '../../components/Header/Header';
import Section from '../../components/Section/Section';
import Animation from './animation/Animation';
import Counter from './counter/Counter';
import Expression from './expression/Expression';

const ExamplesPage: FC = (): JSX.Element => {
  const [toggle, setToggle] = useState(false);
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
          <Animation />
        </Section>
      </main>
    </>
  );
};

export default ExamplesPage;
