/**
 * An implementation of the game of life
 *
 * See: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 */
import './Life.css';

import {
  //faGauge,
  //faGaugeHigh,
  faPalette,
  faPause,
  faPlay,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

import Button from '../../components/Button/Button';
import { LifeStore, LifeTypes } from './LifeAbstract';
import {
  LifeContainerProps,
  LifeFastProps,
  LifeSlowProps,
  LifeStoreBoolean,
  LifeStoreNumeric,
  StoreTypes,
} from './LifeEntities';
import FastLife from './LifeFast';
import LifeSlow from './LifeSlow';

enum Speed {
  SLOW,
  FAST,
}

const LifeContainer: FC<LifeContainerProps> = memo((props): JSX.Element => {
  const { width, height } = props;
  const [initialising, setInitialising] = useState(true);
  const [generations, setGenerations] = useState<number>(0);
  const [paused, setPaused] = useState(false);
  const isPaused = useRef<boolean>(paused);
  const [speed /*setSpeed*/] = useState<Speed>(Speed.FAST);
  const [lifeStore, toggleStore] = useReducer(
    (prev: StoreTypes): StoreTypes => {
      return new (
        prev instanceof LifeStoreBoolean ? LifeStoreNumeric : LifeStoreBoolean
      )(width, height, prev as LifeStore);
    },
    new LifeStoreBoolean(width, height)
  );

  useEffect(() => setInitialising(true), []);
  useEffect(() => {
    isPaused.current = paused;
  });
  const reset = useCallback(() => {
    const wasPaused: boolean = isPaused.current;
    setPaused(true);
    lifeStore.reset(width, height);
    setPaused(wasPaused);
  }, [lifeStore, width, height]);
  const toggle = useCallback(() => {
    const wasPaused: boolean = isPaused.current;
    setPaused(true);
    toggleStore();
    setPaused(wasPaused);
  }, []);
  const rendered = useCallback(() => {
    setGenerations(lifeStore.generations);
  }, [lifeStore]);
  return (
    <div className='Life-Container'>
      {
        <>
          {speed === Speed.FAST ? (
            <FastLife
              {...({
                ...props,
                setInitialising,
                paused,
                lifeStore,
                size: 4,
                rendered,
              } as LifeFastProps<LifeTypes>)}
            />
          ) : (
            <LifeSlow
              {...({
                ...props,
                setInitialising,
                paused,
                lifeStore,
                rendered,
              } as LifeSlowProps<LifeTypes>)}
            />
          )}
          <div className='Life-Info'>Total generations: {generations}</div>
          <div className='Life-Controls'>
            <Button onClick={() => setPaused((paused) => !paused)}>
              <FontAwesomeIcon icon={paused ? faPlay : faPause} />
            </Button>
            {/* 
            <button
              title={speed === Speed.SLOW ? `Speed up` : `Slow down`}
              onClick={() =>
                setSpeed((current) =>
                  current === Speed.SLOW ? Speed.FAST : Speed.SLOW
                )
              }
            >
              <FontAwesomeIcon
                icon={speed === Speed.SLOW ? faGaugeHigh : faGauge}
              />
            </button>
             */}
            <Button title='Reset' onClick={() => reset()}>
              <FontAwesomeIcon icon={faRotateLeft} />
            </Button>
            <Button title='Toggle Rendering' onClick={() => toggle()}>
              <FontAwesomeIcon icon={faPalette} />
            </Button>
          </div>
        </>
      }
      {initialising && <div className='Life-Initialising'>Initialising...</div>}
    </div>
  );
});

export default LifeContainer;
