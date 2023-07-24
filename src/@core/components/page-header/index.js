// ** MUI Imports
import { Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";

const PageHeader = (props) => {
  // ** Props
  const { title, subtitle, button, onTap } = props;

  return (
    <Grid item flexGrow={1} width={"100%"} sx={{ backgroundColor: "#FFFFFF", margin: "15px", borderRadius: "12px", boxShadow: "0px 2px 10px 0px rgba(76, 78, 100, 0.22)", padding: "20px" }}>
      <Stack
        flexDirection={"row"}
        width={"100%"}
        justifyContent={"space-between"}
      >
        <Stack>
          {title}
          {subtitle || null}
        </Stack>
        {button && <Button color="secondary" onClick={onTap}>{button}</Button>}
      </Stack>
    </Grid>
  );
};

export default PageHeader;
