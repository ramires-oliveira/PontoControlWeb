import {
  Container,
  ContentButton,
  Content,
  ContentForm,
  ContentHeader,
} from "../Profile/styles";
import NavBar from "../../components/NavBar/Index";
import SideBar from "../../components/SideBar/Index";
import Card from "../../components/Card/Index";
import { TextField } from "@mui/material";
import Button from "../../components/Button/Index";

const NewEmployee = () => {
  return (
    <>
      <NavBar />
      <Container>
        <SideBar />
        <Card>
          <Content>
            <ContentHeader>
              <h1>Novo Funcionário</h1>
            </ContentHeader>
            <ContentForm>
              <TextField id="Name" label="Nome" variant="outlined" />
              <TextField id="LastName" label="Sobrenome" variant="outlined" />
              <TextField id="Document" label="Documento" variant="outlined" />
              <TextField id="Email" label="Email" variant="outlined" />
              <TextField id="Company" label="Empresa" variant="outlined" />
              <TextField id="Office" label="Cargo" variant="outlined" />
            </ContentForm>
            <ContentButton>
              <Button color="#fff" text="CADASTRAR" />
            </ContentButton>
          </Content>
        </Card>
      </Container>
    </>
  );
};

export default NewEmployee;
