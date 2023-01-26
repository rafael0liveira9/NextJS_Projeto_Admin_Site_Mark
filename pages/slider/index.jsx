import { Checkbox, Input, makeStyles, Slider } from "@material-ui/core";
import React, { useState } from "react";
import SEO from "../../components/Seo/SEO";
import styles from "../../assets/jss/nextjs-material-dashboard/views/lp";

function Index() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [value, setValue] = useState(399);
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
  const [checkBox3, setCheckBox3] = useState(false);
  const [checkBox4, setCheckBox4] = useState(false);

  return (
    <div className={classes.mainPanel}>
      <div className={classes.mainContent}>
        <h1>Quanto você quer investir?</h1>
        <div>
          <h3>Valor Mínimo e Máximo</h3>
          <Slider
            getAriaLabel={() => "Minimum distance"}
            value={value}
            min={399}
            max={1299}
            onChange={(e, t) => setValue(t)}
            valueLabelDisplay="auto"
            getAriaValueText={(a) => `${a}`}
          />
        </div>
        <div className={classes.row}>
          <Checkbox value={checkBox1} onChange={(e, i) => setCheckBox1(i)} />
          <p>Já possui rede social ativa?</p>
          {checkBox1 && (
            <div className={classes.row}>
              <p>Deseja melhora-la?</p>
              <Checkbox />
            </div>
          )}
        </div>
        <div className={classes.row}>
          <Checkbox value={checkBox2} onChange={(e, i) => setCheckBox2(i)} />
          <p>Já possui logo?</p>
          {checkBox2 && (
            <div className={classes.row}>
              <p>Deseja melhora-la?</p>
              <Checkbox />
            </div>
          )}
        </div>
        <div className={classes.row}>
          <Checkbox value={checkBox3} onChange={(e, i) => setCheckBox3(i)} />
          <p>Já possui site?</p>
          {checkBox3 && (
            <div className={classes.row}>
              <p>Deseja melhora-la?</p>
              <Checkbox />
            </div>
          )}
        </div>
        <div className={classes.row}>
          <Checkbox value={checkBox4} onChange={(e, i) => setCheckBox4(i)} />
          <p>Já possui blog?</p>
          {checkBox4 && (
            <div className={classes.row}>
              <p>Deseja melhora-la?</p>
              <Checkbox />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
