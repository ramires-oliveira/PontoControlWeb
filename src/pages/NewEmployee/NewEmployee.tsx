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
import Loading from "../../components/Loading";
import { mask } from "../../services/cpfMask";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialFormData);
  const [document, setDocument] = useState<string>("");
  const token = getAuthToken();

  const resetForm = () => {
    setFormData(initialFormData);
    setDocument("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      document: document,
      [id]: value,
    }));
  };

  const handleNewEmployeeClick = async () => {
    setLoading(true);
    const updatedFormData = {
      ...formData,
      password: "123456",
    };

    await axios
      .post(`${import.meta.env.VITE_APP_API_URL}/User`, updatedFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        resetForm();
        Swal.fire({
          title: "Cadastro Realizado !",
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

  function handleChangeMask(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setDocument(mask(value));
  }

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
                value={document}
                onChange={handleChangeMask}
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
              {loading && <Loading />}
            </ContentButton>
          </Content>
        </Card>
      </Container>
    </>
  );
};

export default NewEmployee;
