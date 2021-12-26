import React, { useEffect, useRef } from "react";
import { Image, Stage, Layer, Line, Text, Circle } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import useImage from "use-image";

const IMAGE_SRC = "/images/bg.jpg";

export const Drawer = () => {
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState([]);
  const [circles, setCircles] = React.useState([]);

  const isDrawing = React.useRef(false);
  const [image, state] = useImage(IMAGE_SRC);
  const stageRef = useRef(null);

  useEffect(() => {
    if (state === "loaded") {
    }
  }, [state, image]);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: KonvaEventObject<TouchEvent>) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    console.log("point", point);

    setCircles((prev) => [...prev, [point.x, point.y]]);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  if (!image) {
    return null;
  }

  const handleExport = () => {
    if (stageRef.current) {
      const uri = stageRef.current.toDataURL();
      console.log(uri);
    }
  };

  return (
    <div>
      <button name="asmdkasd" onClick={handleExport}>
        asdmkasd
      </button>
      <Stage
        width={image.width}
        height={image.height}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleMouseMove}
        onClick={handleClick}
        ref={stageRef}
      >
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
          <Image image={image} fillPatternImage={image} />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
          {circles.map(([x, y]) => (
            <Circle x={x} y={y} radius={10} fill="green" />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};
