import {
  Container,
  ContentHeader,
  ContentButton,
  ContentForm,
  Content,
} from "./styles";
import NavBar from "../../components/NavBar/Index";
import SideBar from "../../components/SideBar/Index";
import Card from "../../components/Card/Index";
import { TextField } from "@mui/material";
import Button from "../../components/Button/Index";

const Perfil = () => {
  return (
    <>
      <NavBar />
      <Container>
        <SideBar />
        <Card>
          <Content>
            <ContentHeader>
              <h1>Perfil</h1>
            </ContentHeader>
            <ContentForm>
              <TextField id="Nome" label="Nome" variant="outlined" />
              <TextField id="Sobrenome" label="Sobrenome" variant="outlined" />
              <TextField id="Documento" label="Documento" variant="outlined" />
              <TextField id="Email" label="Email" variant="outlined" />
              <TextField id="Empresa" label="Empresa" variant="outlined" />
              <TextField id="Cargo" label="Cargo" variant="outlined" />
            </ContentForm>
            <ContentButton>
              <Button color="#fff" text="ALTERAR" />
            </ContentButton>
          </Content>
        </Card>
      </Container>
    </>
  );
};

export default Perfil;
