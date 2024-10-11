"use client";
import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";

const SliderPoint = ({ actualPoint, onChangeValue }) => {
  const [visibility, setVisibility] = useState(0); // 0: admin, 1: users, 2: visitors
  const labels = ["Sólo Admin", "Admin + Users", "Admin + Users + Visitantes"];

  useEffect(() => {
    setVisibility(actualPoint);
  }, [actualPoint]);

  const handleSliderChange = (value) => {
    setVisibility(value);
    if (onChangeValue) {
      onChangeValue(value);
    }
  };

  return (
    <div className="flex flex-col">
      <label className="text-xs text-slate-600 mb-2">
        Visibilidad de precios:
      </label>
      <ReactSlider
        className="w-full h-2 bg-gray-300 rounded relative"
        thumbClassName="w-4 h-4 bg-blue-500 rounded-full absolute top-[-4px]"
        trackClassName="h-full bg-blue-500 rounded"
        min={0}
        max={2}
        step={1}
        value={visibility}
        onChange={handleSliderChange}
        marks={true}
      />
      <p className="text-xs text-slate-600 my-2">
        Actual visibilidad: &nbsp;
        <span className="font-bold">{labels[visibility]}</span>
      </p>
    </div>
  );
};

export default SliderPoint;
