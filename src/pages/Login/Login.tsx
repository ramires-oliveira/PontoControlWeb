import { TextField } from "@mui/material";
import Logo1 from "../../assets/images/Logo_1.png";
import Logo3 from "../../assets/images/Logo_3.png";
import Button from "../../components/Button/Index";
import { Container, ContentImg, ContentForm, Form } from "./styles";

const Login = () => {
  return (
    <Container>
      <ContentImg>
        <img src={Logo1} alt="Logo" id="logo" />
        <img src={Logo3} alt="LogoMobile" id="logoMobile" />
      </ContentImg>
      <ContentForm>
        <Form>
          <h1>Login</h1>
          <TextField id="Login" label="Login" variant="outlined" />
          <TextField id="Password" label="Senha" variant="outlined" />
          <div>
            <Button color="#3c3c3b" text="ENTRAR" />
            <span>
              Esqueceu sua senha ? <a href="/resetePassword">Clique aqui</a>
            </span>
          </div>
        </Form>
      </ContentForm>
    </Container>
  );
};

export default Login;
