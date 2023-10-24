import React, { useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import Swal from "sweetalert2";
import { getAuthToken } from "../../auth/authService";
import NavBar from "../../components/NavBar/Index";
import SideBar from "../../components/SideBar/Index";
import Card from "../../components/Card/Index";
import Button from "../../components/Button/Index";
import {
  Container,
  ContentButton,
  Content,
  ContentForm,
  ContentHeader,
} from "../Profile/styles";

const initialFormData = {
  firstName: "",
  lastName: "",
  document: "",
  email: "",
  password: "",
  typeUser: "",
  position: "",
};

const NewEmployee = () => {
  const [formData, setFormData] = useState(initialFormData);
  const apiUrl = "https://localhost:7083/User";
  const token = getAuthToken();

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleNewEmployeeClick = async () => {
    const updatedFormData = {
      ...formData,
      password: "123456",
    };

    await axios
      .post(apiUrl, updatedFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        resetForm();

        Swal.fire({
          title: "Cadastrado Realizado !",
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
              <h1>Novo Funcionário</h1>
            </ContentHeader>
            <ContentForm>
              <TextField
                id="firstName"
                label="Nome"
                variant="outlined"
                value={formData.firstName}
                onChange={handleChange}
              />
              <TextField
                id="lastName"
                label="Sobrenome"
                variant="outlined"
                value={formData.lastName}
                onChange={handleChange}
              />
              <TextField
                id="document"
                label="Documento"
                variant="outlined"
                value={formData.document}
                onChange={handleChange}
              />
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                id="position"
                label="Cargo"
                variant="outlined"
                value={formData.position}
                onChange={handleChange}
              />
            </ContentForm>
            <ContentButton>
              <Button
                color="#fff"
                text="CADASTRAR"
                onClick={handleNewEmployeeClick}
              />
            </ContentButton>
          </Content>
        </Card>
      </Container>
    </>
  );
};

export default NewEmployee;
