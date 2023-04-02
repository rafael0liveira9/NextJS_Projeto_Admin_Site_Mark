import React, { useState } from 'react';


const Packages = () => {
    return (
        <div class="full-page-start">
            <div class="full-content-slider">
                <div><h1>Qual valor deseja investir?</h1></div>
                <div><p>Slider</p></div>
                {/* <Slider
                    aria-label="Restricted values"
                    defaultValue={20}
                    valueLabelFormat={valueLabelFormat}
                    getAriaValueText={valuetext}
                    step={null}
                    valueLabelDisplay="auto"
                    marks={marks}
                /> */}
                <div>
                    <div><p>Question 1</p></div>
                    <div><p>Question 1.1</p></div>
                    <div><p>Question 2</p></div>
                    <div><p>Question 2.1</p></div>
                    <div><p>Question 3</p></div>
                    <div><p>Question 3.1</p></div>
                    <div><p>Question 4</p></div>
                    <div><p>Question 4.1</p></div>
                </div>
                <div><p>Button</p></div>
            </div>
        </div>
    )
}

export default Packages