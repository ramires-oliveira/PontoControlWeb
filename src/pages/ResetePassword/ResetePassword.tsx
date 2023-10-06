import { TextField } from "@mui/material";
import Logo1 from "../../assets/images/Logo_1.png";
import Logo3 from "../../assets/images/Logo_3.png";
import Button from "../../components/Button/Index";
import { Container, ContentImg, ContentForm, Form } from "../Login/styles";

const ResetePassword = () => {
  return (
    <Container>
      <ContentImg>
        <img src={Logo1} alt="Logo" id="logo" />
        <img src={Logo3} alt="LogoMobile" id="logoMobile" />
      </ContentImg>
      <ContentForm>
        <Form>
          <h1>Resetar Senha</h1>
          <TextField id="NewPassword" label="Nova Senha" variant="outlined" />
          <TextField id="NewPassword2" label="Nova Senha" variant="outlined" />
          <div>
            <Button color="#3c3c3b" text="ENTRAR" />
            <span>
              Voltar para página inicial ? <a href="/login">Clique aqui</a>
            </span>
          </div>
        </Form>
      </ContentForm>
    </Container>
  );
};

export default ResetePassword;
