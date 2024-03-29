import { TextField } from "@mui/material";
import Logo1 from "../../assets/images/Logo_1.png";
import Logo3 from "../../assets/images/Logo_3.png";
import Button from "../../components/Button/Index";
import { Container, ContentImg, ContentForm, Form } from "../Login/styles";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { useSidebar } from "../../reactContext/SidebarContext";

interface ResetePasswordData {
  email: string;
  password: string;
  newPassword: string;
}

const ResetePassword = () => {
  const { user, setUser } = useSidebar();
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    axios
      .put(
        `${import.meta.env.VITE_APP_API_URL}/User/update-password-no-logged`,
        formData
      )
      .then(() => {
        Swal.fire({
          title: "Resete Realizado !",
          icon: "success",
          allowOutsideClick: false,
          cancelButtonColor: "#29abe3",
          confirmButtonColor: "#29abe3",
        });
        setLoading(false);
        setUser(
          {
            name: user?.name,
            email: user?.email,
            document: user?.document,
            position: user?.position,
            typeUser: user?.typeUser,
            token: user?.token as string,
            isFirstLogin: true,
          }
        );
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.messages
        ) {
          const errorMessages: string[] = error.response.data.messages;

          const errorMessageContent: string = errorMessages
            .map((message: string, index: number) => {
              return `${index + 1}. ${message}`;
            })
            .join("<br>");

          const errorMessageHTML: string = `<div>${errorMessageContent}</div>`;

          Swal.fire({
            title: "Atenção !",
            html: errorMessageHTML,
            icon: "warning",
            allowOutsideClick: false,
            cancelButtonColor: "#29abe3",
            confirmButtonColor: "#29abe3",
          });
        }
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
            label="Senha"
            variant="outlined"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            id="newPassword"
            label="Nova Senha"
            variant="outlined"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <div>
            <Button
              color="#3c3c3b"
              text="ALTERAR"
              onClick={handleResetePasswordClick}
            />
            {loading && <Loading />}
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

