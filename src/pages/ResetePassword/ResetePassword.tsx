import { TextField } from "@mui/material";
import Logo1 from "../../assets/images/Logo_1.png";
import Logo3 from "../../assets/images/Logo_3.png";
import Button from "../../components/Button/Index";
import { Container, ContentImg, ContentForm, Form } from "../Login/styles";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface ResetePasswordData {
  email: string;
  password: string;
  newPassword: string;
}

const ResetePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ResetePasswordData>({
    email: "",
    password: "",
    newPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleResetePasswordClick = () => {
    const apiUrl = "https://localhost:7083/User/update-password";

    axios
      .put(apiUrl, formData)
      .then(() => {
        Swal.fire({
          title: "Resete Realizado !",
          icon: "success",
          allowOutsideClick: false,
          cancelButtonColor: "#29abe3",
          confirmButtonColor: "#29abe3",
        });

        navigate("/login");
      })
      .catch(() => {
        Swal.fire({
          title: "Erro !",
          text: "Entre em contato com o suporte.",
          icon: "error",
          allowOutsideClick: false,
          cancelButtonColor: "#29abe3",
          confirmButtonColor: "#29abe3",
        });
      });
  };

  return (
    <Container>
      <ContentImg>
        <img src={Logo1} alt="Logo" id="logo" />
        <img src={Logo3} alt="LogoMobile" id="logoMobile" />
      </ContentImg>
      <ContentForm>
        <Form>
          <h1>Resetar Senha</h1>
          <TextField
            id="email"
            label="Login"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            id="password"
            label="Nova Senha"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            id="newPassword"
            label="Nova Senha"
            variant="outlined"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <div>
            <Button
              color="#3c3c3b"
              text="ENTRAR"
              onClick={handleResetePasswordClick}
            />
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
