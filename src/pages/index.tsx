import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Stage, Layer, Rect, Text } from 'react-konva';

import { Card } from '../components/Card';
import { Mok } from '../components/Mok';
import { IJSONMok, parseMok } from '../generators/parsers';
import { getMok } from '../generators';
import { KonvaEventObject } from 'konva/types/Node';

const MoksContainer = styled.div`
  padding: 1rem;
`;

const Canvas: FC<PropsWithChildren<Record<string, unknown>>> = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => {
  const [windowSize, setWindowSize] = useState({ x: 0, y: 0 });
  const [stageScale, setStageScale] = useState(1);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [scaleBy, setScaleBy] = useState(1.05);

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const stage = e.target.getStage();
    if (!stage) return;

    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;

    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: pointerPos.x / oldScale - stage.x() / oldScale,
      y: pointerPos.y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

    setStageScale(newScale);
    setStagePos({
      x: -(mousePointTo.x - pointerPos.x / newScale) * newScale,
      y: -(mousePointTo.y - pointerPos.y / newScale) * newScale,
    });
  };

  useEffect(() => {
    setWindowSize({ x: window.innerWidth, y: window.innerHeight });
  }, []);

  return (
    <Stage
      width={windowSize.x}
      height={windowSize.y}
      onWheel={handleWheel}
      scaleX={stageScale}
      scaleY={stageScale}
      x={stagePos.x}
      y={stagePos.y}
      draggable
    >
      <Layer>{children}</Layer>
    </Stage>
  );
};

const App: FC = () => {
  const [finalMok, setFinalMok] = useState<IJSONMok>('');
  const [finalMokValue, setFinalMokValue] = useState<string>('');

  const refreshMok = () => {
    console.log('bruh');
    setFinalMokValue(JSON.stringify(getMok(parseMok(finalMok))));
  };

  useEffect(() => refreshMok(), [finalMok]);

  return (
    <>
      <Canvas>
        <Text text="hello" fontSize={16} />
      </Canvas>
      <Card title="New Mok">
        <MoksContainer>
          <Mok updateParentMok={setFinalMok} />
        </MoksContainer>
      </Card>
      <div>{finalMokValue}</div>
    </>
  );
};

export default App;
