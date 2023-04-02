import React, { useState } from 'react';
import Link from 'next/link';
import Slider from '@mui/material/Slider'


const Start = () => {
    return (
        <div class="full-page-start">
            <div class="full-content-slider">
                <div><h1>Qual valor deseja investir?</h1></div>
                <div><p>Slider</p></div>
                <Slider orientation='horizontal' min={399} max={1299} defaultValue={399} aria-labelledby='vertical-slider'/>
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
                <div><Link href={`http://localhost:3000/start/packages/`}>Escolher beneficios</Link></div>
            </div>
        </div>
    )
}

export default Start