import React, { useState } from "react";
import Link from "next/link";
import SliderCustomMarks from "src/views/forms/form-elements/slider/SliderCustomMarks";
import StepsShow from "../components/stepsShow";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { useRouter } from "next/router";
import { RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";

const Start = () => {
  const router = useRouter();
  const [sliderValue, setSliderValue] = useState(39990);
  const [questionOne, setQuestionOne] = useState(true);
  const [questionTwo, setQuestionTwo] = useState(true);
  const [questionTree, setQuestionTree] = useState(true);
  const [questionFour, setQuestionFour] = useState(true);
  const handleChangeOne = (event) => {
    setQuestionOne(event.target.value);
  };
  const handleChangeTwo = (event) => {
    setQuestionTwo(event.target.value);
  };
  const handleChangeTree = (event) => {
    setQuestionTree(event.target.value);
  };
  const handleChangeFour = (event) => {
    setQuestionFour(event.target.value);
  };

  const marks = [
    {
      value: 39990,
      label: "R$ 399,90",
    },
    {
      value: 69990,
      label: "R$ 699,90",
    },
    {
      value: 99990,
      label: "R$ 999,90",
    },
    {
      value: 129990,
      label: "R$ 1299,90",
    },
  ];

  return (
    <div class="full-page-start">
      <div class="full-content-slider" style={{ marginTop: 20 }}>
        <div class="checkbox-div-title">
          <p>Qual valor deseja investir em Marketing Digital?</p>
        </div>
        <div style={{ width: "75%", marginBottom: 20 }}>
          <SliderCustomMarks
            sx={{ '& input[type="range"]': { margin: "10px" } }}
            step={null}
            marks={marks}
            defaultValue={39990}
            variable=""
            min={39990}
            max={129990}
            valueLabelFormat={(x) =>
              `${x.toString().replace(/^(\d*)(\d{2})$/g, "R$ $1,$2")}`
            }
            value={sliderValue}
            onChange={(e, v) => {
              setSliderValue(v);
            }}
          />
        </div>
      </div>
      <div class="full-page-start">
        <div class="full-content-slider">
          <div class="checkbox-div" style={{ paddingBottom: "20px" }}>
            <div class="checkbox-div-title">
              <p>
                Deseja a criação ou modificação de uma Logo para a sua Marca?
              </p>
            </div>
            <RadioGroup
              row
              aria-label="controlled"
              name="controlled"
              value={questionOne}
              onChange={handleChangeOne}
            >
              <FormControlLabel value={true} control={<Radio />} label="Sim" />
              <FormControlLabel value={false} control={<Radio />} label="Não" />
            </RadioGroup>
          </div>
        </div>
        <div class="full-content-slider">
          <div class="checkbox-div" style={{ paddingBottom: "20px" }}>
            <div class="checkbox-div-title">
              <p>
                Deseja a criação ou otimização de Redes Sociais para sua
                Empresa?
              </p>
            </div>
            <RadioGroup
              row
              aria-label="controlled"
              name="controlled"
              value={questionTwo}
              onChange={handleChangeTwo}
            >
              <FormControlLabel value={true} control={<Radio />} label="Sim" />
              <FormControlLabel value={false} control={<Radio />} label="Não" />
            </RadioGroup>
          </div>
        </div>
        <div class="full-content-slider">
          <div class="checkbox-div" style={{ paddingBottom: "20px" }}>
            <div class="checkbox-div-title">
              <p>Deseja a criação ou melhoria de um Site para a sua Empresa?</p>
            </div>
            <RadioGroup
              row
              aria-label="controlled"
              name="controlled"
              value={questionTree}
              onChange={handleChangeTree}
            >
              <FormControlLabel value={true} control={<Radio />} label="Sim" />
              <FormControlLabel value={false} control={<Radio />} label="Não" />
            </RadioGroup>
          </div>
        </div>
        <div class="full-content-slider">
          <div class="checkbox-div" style={{ paddingBottom: "20px" }}>
            <div class="checkbox-div-title">
              <p>
                Tem interesse de conteúdo ou artes para postagem no seu Blog ou
                LinkedIn?
              </p>
            </div>
            <RadioGroup
              row
              aria-label="controlled"
              name="controlled"
              value={questionFour}
              onChange={handleChangeFour}
            >
              <FormControlLabel value={true} control={<Radio />} label="Sim" />
              <FormControlLabel value={false} control={<Radio />} label="Não" />
            </RadioGroup>
          </div>
        </div>
        <Button
          variant="contained"
          onClick={() => router.push("/start/packages")}
          style={{
            cursor: "pointer",
            margin: "20px",
            width: "250px",
            height: "50px",
          }}
          color="secondary"
        >
          AVANÇAR
        </Button>
        {/* <div onClick={() => router.push("/start/packages")}><button style={{ cursor: "pointer" }} class="custom-button" href={`/start/packages/`}>AVANÇAR</button></div> */}
      </div>
      <StepsShow step={1}></StepsShow>
    </div>
  );
};

export default Start;
Start.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
Start.guestGuard = false;
