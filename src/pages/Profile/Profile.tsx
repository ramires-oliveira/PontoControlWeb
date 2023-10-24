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
import { useSidebar } from "../../reactContext/SidebarContext";
import axios from "axios";
import { getAuthToken } from "../../auth/authService";
import { useState } from "react";
import Swal from "sweetalert2";

interface ResetePasswordData {
  password: string;
  newPassword: string;
}

const initialFormData = {
  password: "",
  newPassword: "",
};

const Perfil = () => {
  const { user } = useSidebar();
  const [formData, setFormData] = useState(initialFormData);
  const apiUrl = "https://localhost:7083/User/update-password";
  const token = getAuthToken();

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleResetePasswordClick = () => {
    axios
      .put(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        resetForm();

        Swal.fire({
          title: "Resete Realizado !",
          icon: "success",
          allowOutsideClick: false,
          cancelButtonColor: "#29abe3",
          confirmButtonColor: "#29abe3",
        });
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
              <TextField
                id="name"
                label="Nome"
                variant="outlined"
                disabled
                value={user?.name}
              />
              <TextField
                id="document"
                label="Documento"
                variant="outlined"
                disabled
                value={user?.document}
              />
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                disabled
                value={user?.email}
              />
              <TextField
                id="position"
                label="Cargo"
                variant="outlined"
                disabled
                value={user?.position}
              />
              <TextField
                id="password"
                label="Senha"
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
            </ContentForm>
            <ContentButton>
              <Button
                color="#fff"
                text="Alterar Senha"
                onClick={handleResetePasswordClick}
              />
            </ContentButton>
          </Content>
        </Card>
      </Container>
    </>
  );
};

export default Perfil;
