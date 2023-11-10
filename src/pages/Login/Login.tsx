import { TextField } from "@mui/material";
import Logo1 from "../../assets/images/Logo_1.png";
import Logo3 from "../../assets/images/Logo_3.png";
import Button from "../../components/Button/Index";
import { Container, ContentImg, ContentForm, Form } from "./styles";
import axios from "axios";
import { useState } from "react";
import { logout, setAuthToken } from "../../auth/authService";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../../reactContext/SidebarContext";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const { setUser } = useSidebar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleLoginClick = async () => {
    setLoading(true);
    logout();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/Login`,
        formData
      );

      setUser(response.data);
      setAuthToken(response.data.token);

      navigate("/home");
    } catch (error: any) {
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
    }
    
  };

  return (
    <Container>
      <ContentImg>
        <img src={Logo1} alt="Logo" id="logo" />
        <img src={Logo3} alt="LogoMobile" id="logoMobile" />
      </ContentImg>
      <ContentForm>
        <Form>
          <h1>Login</h1>
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
          <div>
            <Button color="#3c3c3b" text="ENTRAR" onClick={handleLoginClick} />
            {loading && <Loading />}
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
