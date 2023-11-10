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
import Loading from "../../components/Loading";

interface ResetePasswordData {
  password: string;
  newPassword: string;
}

const initialFormData = {
  password: "",
  newPassword: "",
};

const Perfil = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useSidebar();
  const [formData, setFormData] = useState(initialFormData);
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
    setLoading(true);
    axios
      .put(
        `${import.meta.env.VITE_APP_API_URL}/User/update-password`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        resetForm();

        Swal.fire({
          title: "Resete Realizado !",
          icon: "success",
          allowOutsideClick: false,
          cancelButtonColor: "#29abe3",
          confirmButtonColor: "#29abe3",
        });
        setLoading(false);
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
              {user?.typeUser === 1 && (
                <TextField
                  id="document"
                  label="Documento"
                  variant="outlined"
                  disabled
                  value={user?.document}
                />
              )}
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                disabled
                value={user?.email}
              />
              {user?.typeUser === 1 && (
                <TextField
                  id="position"
                  label="Cargo"
                  variant="outlined"
                  disabled
                  value={user?.position}
                />
              )}
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
            </ContentForm>
            <ContentButton>
              <Button
                color="#fff"
                text="Alterar Senha"
                onClick={handleResetePasswordClick}
              />
              {loading && <Loading />}
            </ContentButton>
          </Content>
        </Card>
      </Container>
    </>
  );
};

export default Perfil;
