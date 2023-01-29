import {
  Button,
  Checkbox,
  Input,
  makeStyles,
  Slider,
  Tooltip,
} from "@material-ui/core";
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

  const [formData, setFormData] = useState({
    value: 399,
    haveLogo: {
      isTrue: false,
      needModification: false,
    },
    haveSite: {
      isTrue: false,
      needModification: false,
    },
    haveSocialMidia: {
      isTrue: false,
      needModification: false,
    },
    haveBlog: {
      isTrue: false,
      needModification: false,
    },
  });

  function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
      <Tooltip
        open={open}
        enterTouchDelay={0}
        placement="top"
        title={`${value},00 R$`}
      >
        {children}
      </Tooltip>
    );
  }

  async function sendData() {
    console.log(formData);
    let data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}search/packages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
  }

  return (
    <div className={classes.mainPanel}>
      <div className={classes.mainContent}>
        <h1>Quanto você quer investir?</h1>
        <div>
          <h3>Diga um valor</h3>
          <Slider
            getAriaLabel={() => "Minimum distance"}
            value={value}
            min={399}
            max={1299}
            onChange={(e, t) => {
              setValue(t);
              setFormData({ ...formData, value: t });
            }}
            valueLabelDisplay="auto"
            ValueLabelComponent={ValueLabelComponent}
            marks={[
              {
                value: 399,
                label: "399,00 R$",
              },
              {
                value: 1299,
                label: "1299,00 R$",
              },
            ]}
          />
        </div>
        <div className={classes.column}>
          <div className={classes.row}>
            <Checkbox
              value={checkBox1}
              onChange={(e, i) => {
                setCheckBox1(i);
                setFormData({
                  ...formData,
                  haveSocialMidia: {
                    isTrue: i,
                    needModification: false,
                  },
                });
              }}
            />
            <p>Já possui rede social ativa?</p>
          </div>
          {checkBox1 && (
            <div className={classes.rowSub}>
              <Checkbox
                onChange={(e, i) => {
                  setFormData({
                    ...formData,
                    haveSocialMidia: {
                      isTrue: checkBox1,
                      needModification: i,
                    },
                  });
                }}
              />
              <p>Deseja melhora-la?</p>
            </div>
          )}
        </div>
        <div className={classes.column}>
          <div className={classes.row}>
            <Checkbox
              value={checkBox2}
              onChange={(e, i) => {
                setCheckBox2(i);
                setFormData({
                  ...formData,
                  haveLogo: {
                    isTrue: i,
                    needModification: false,
                  },
                });
              }}
            />
            <p>Já possui logo?</p>
          </div>
          {checkBox2 && (
            <div className={classes.rowSub}>
              <Checkbox
                onChange={(e, i) => {
                  setFormData({
                    ...formData,
                    haveLogo: {
                      isTrue: checkBox2,
                      needModification: i,
                    },
                  });
                }}
              />
              <p>Deseja melhora-la?</p>
            </div>
          )}
        </div>
        <div className={classes.column}>
          <div className={classes.row}>
            <Checkbox
              value={checkBox3}
              onChange={(e, i) => {
                setCheckBox3(i);
                setFormData({
                  ...formData,
                  haveSite: {
                    isTrue: i,
                    needModification: false,
                  },
                });
              }}
            />
            <p>Já possui site?</p>
          </div>
          {checkBox3 && (
            <div className={classes.rowSub}>
              <Checkbox
                onChange={(e, i) => {
                  setFormData({
                    ...formData,
                    haveLogo: {
                      isTrue: checkBox3,
                      needModification: i,
                    },
                  });
                }}
              />
              <p>Deseja melhora-la?</p>
            </div>
          )}
        </div>
        <div className={classes.column}>
          <div className={classes.row}>
            <Checkbox
              value={checkBox4}
              onChange={(e, i) => {
                setCheckBox4(i);
                setFormData({
                  ...formData,
                  haveBlog: {
                    isTrue: i,
                    needModification: false,
                  },
                });
              }}
            />
            <p>Já possui blog?</p>
          </div>
          {checkBox4 && (
            <div className={classes.rowSub}>
              <Checkbox
                onChange={(e, i) => {
                  setFormData({
                    ...formData,
                    haveLogo: {
                      isTrue: checkBox4,
                      needModification: i,
                    },
                  });
                }}
              />
              <p>Deseja melhora-la?</p>
            </div>
          )}
        </div>
        <div className={classes.rowEnd}>
          <Button
            className={classes.buttonStyle}
            onClick={async () => await sendData()}
          >
            Procurar Pacotes
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Index;
