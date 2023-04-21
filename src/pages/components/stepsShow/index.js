import React from "react"
import { AiOutlineDollar, AiOutlineMinus, AiOutlineOrderedList, AiOutlineCheck } from "react-icons/ai";

const StepsShow = (step) => {
  console.log(step.step);
    switch(step.step){
      case 1:
      return (
        <div className="stepsBar">
          <div className="stepNow"><p>1</p></div>
          <div className="stepSeparator"><AiOutlineMinus size={15} fill="#17084e"></AiOutlineMinus></div>
          <div className="step"><p>2</p></div>
          <div className="stepSeparator"><AiOutlineMinus size={15} fill="#17084e"></AiOutlineMinus></div>
          <div className="step"><p>3</p></div>
          <div className="stepSeparator"><AiOutlineMinus size={15} fill="#17084e"></AiOutlineMinus></div>
          <div className="step"><p>4</p></div>
        </div> 
        )
     break;
     case 2:
      return (
        <div className="stepsBar">
          <div className="stepVerify"><AiOutlineCheck size={35} fill="#028200"></AiOutlineCheck></div>
          <div className="stepSeparator"><AiOutlineMinus size={15} fill="#028200"></AiOutlineMinus></div>
          <div className="stepNow"><p>2</p></div>
          <div className="stepSeparator"><AiOutlineMinus size={15} fill="#17084e"></AiOutlineMinus></div>
          <div className="step"><p>3</p></div>
          <div className="stepSeparator"><AiOutlineMinus size={15} fill="#17084e"></AiOutlineMinus></div>
          <div className="step"><p>4</p></div>
        </div> 
        )
     break;
     case 3:
      return (
        <div className="stepsBar">
          <div className="stepVerify"><AiOutlineCheck size={35} fill="#028200"></AiOutlineCheck></div>
          <div className="stepSeparator"><AiOutlineMinus size={15} fill="#028200"></AiOutlineMinus></div>
          <div className="stepVerify"><AiOutlineCheck size={35} fill="#028200"></AiOutlineCheck></div>
          <div className="stepSeparator"><AiOutlineMinus size={15} fill="#028200"></AiOutlineMinus></div>
          <div className="stepNow"><p>3</p></div>
          <div className="stepSeparator"><AiOutlineMinus size={15} fill="#17084e"></AiOutlineMinus></div>
          <div className="step"><p>4</p></div>
        </div> 
        )
     break;
     case 4:
      return (
        <div className="stepsBar">
          <div className="stepVerify"><AiOutlineCheck size={35} fill="#028200"></AiOutlineCheck></div>
          <div className="stepSeparator"><AiOutlineMinus size={15} fill="#028200"></AiOutlineMinus></div>
          <div className="stepVerify"><AiOutlineCheck size={35} fill="#028200"></AiOutlineCheck></div>
          <div className="stepSeparator"><AiOutlineMinus size={15} fill="#028200"></AiOutlineMinus></div>
          <div className="stepVerify"><AiOutlineCheck size={35} fill="#028200"></AiOutlineCheck></div>
          <div className="stepSeparator"><AiOutlineMinus size={15} fill="#028200"></AiOutlineMinus></div>
          <div className="stepNow"><p>4</p></div>
        </div> 
        )
     break;
     default:
      return (
        <div className="stepsBar">
          <div className="stepVerify"><AiOutlineCheck size={35} fill="#028200"></AiOutlineCheck></div>
          <div className="stepSeparator"><AiOutlineMinus size={15} fill="#028200"></AiOutlineMinus></div>
          <div className="stepVerify"><AiOutlineCheck size={35} fill="#028200"></AiOutlineCheck></div>
          <div className="stepSeparator"><AiOutlineMinus size={15} fill="#028200"></AiOutlineMinus></div>
          <div className="stepVerify"><AiOutlineCheck size={35} fill="#028200"></AiOutlineCheck></div>
          <div className="stepSeparator"><AiOutlineMinus size={15} fill="#028200"></AiOutlineMinus></div>
          <div className="stepVerify"><AiOutlineCheck size={35} fill="#028200"></AiOutlineCheck></div>
        </div> 
        )
    }   
    
}


export default StepsShow
