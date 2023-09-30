import React, { useState } from "react";
import Link from "next/link";
import StepsShow from "../../../@core/pages/components/stepsShow";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { useRouter } from "next/router";
import { FiCheckCircle } from "react-icons/fi";
import {
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    CircularProgress,
} from "@mui/material";

const TankYou = () => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div class="full-page-start" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div class="full-page-start" style={{ height: '80vh', minHeight: 'auto' }}>
                <div class="full-content-slider" style={{ minHeight: '50vh', padding: '1vh 3vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '3vw' }}><FiCheckCircle size={30} color="#00D203"></FiCheckCircle> Obrigado pela compra!</h1>
                    <p style={{ textAlign: 'justify' }}>Você acaba de potencializar o crescimento de sua marca adquirindo um dos serviços do Mark Digital, você recebeu um e-mail com algumas instruções e enquanto confirmamos seu pagamento, que tal aproveitar e baixar o nosso Aplicativo?</p>
                </div>
                <Button
                    variant="contained"
                    onClick={() => console.log("Clicou")}
                    style={{
                        cursor: "pointer",
                        margin: "20px",
                        width: "200px",
                        height: "50px",
                    }}
                    color="secondary"
                >
                    {isLoading ? <CircularProgress></CircularProgress> : "BAIXAR APP"}
                </Button>
            </div>
            <StepsShow step={5}></StepsShow>
        </div>
    );
};

TankYou.anonUser = true;
TankYou.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default TankYou;
