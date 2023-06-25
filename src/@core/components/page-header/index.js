// ** MUI Imports
import { Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";

const PageHeader = (props) => {
  // ** Props
  const { title, subtitle, button, onTap } = props;

  return (
    <Grid item flexGrow={1} width={"100%"}>
      <Stack
        flexDirection={"row"}
        width={"100%"}
        justifyContent={"space-between"}
      >
        <Stack>
          {title}
          {subtitle || null}
        </Stack>
        {button && <Button onClick={onTap}>{button}</Button>}
      </Stack>
    </Grid>
  );
};

export default PageHeader;
