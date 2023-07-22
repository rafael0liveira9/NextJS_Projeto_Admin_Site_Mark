import React, { useState } from "react";
import Link from "next/link";
import SliderCustomMarks from "src/views/forms/form-elements/slider/SliderCustomMarks";
import StepsShow from "../../@core/pages/components/stepsShow";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { useRouter } from "next/router";
import { RadioGroup, FormControlLabel, Radio, Button, CircularProgress } from "@mui/material";
import nookies from "nookies";
import toast from "react-hot-toast";


const Start = () => {


  const router = useRouter();
  const [sliderValue, setSliderValue] = useState(39990);
  const [questionOne, setQuestionOne] = useState(true);
  const [questionTwo, setQuestionTwo] = useState(true);
  const [questionTree, setQuestionTree] = useState(true);
  const [questionFour, setQuestionFour] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubimit = () => {
    if (!isLoading) {
      setIsLoading(true);
      nookies.set(null, "packageChose", JSON.stringify({ sliderValue, questionOne, questionTwo, questionTree }), {
        maxAge: 28800 * 3,
        path: "/",
      });
      toast.success("Buscando uma Oferta para você...");
      router.push("/start/packages");
    }

  }

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
        {/* <div class="full-content-slider">
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
        </div> */}

        <Button variant='contained' onClick={() => onSubimit()} style={{ cursor: "pointer", margin: "20px", width: "200px", height: "50px" }} color='secondary'>{isLoading ? <CircularProgress></CircularProgress> : "VER PROMOÇÕES"}
        </Button>
      </div>
      <StepsShow step={1}></StepsShow>
    </div>
  );
};

Start.guestGuard = true;
Start.authGuard = true;
Start.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;


export default Start;
