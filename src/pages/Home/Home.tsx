import {
  Container,
  Content,
  ContentHeader,
  ContentMarkTime,
  ContentNotMarkTime,
} from "./styles";
import { NavBar } from "../../components/NavBar/Index";
import Card from "../../components/Card/Index";
import Button from "../../components/Button/Index";
import Clock from "../../components/Clock/Index";
import MarkTime from "../../components/MarkTime/Index";
import { Box, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/Index";
import Logo3 from "../../assets/images/Logo_3.png";
import { useSidebar } from "../../reactContext/SidebarContext";
import axios from "axios";
import { getAuthToken } from "../../auth/authService";
import Swal from "sweetalert2";

interface ResetePasswordData {
  password: string;
  newPassword: string;
}

interface Marking {
  hour: Date;
  address: string;
  collaborator: {
    id: string;
    name: string;
  };
}

interface MarkingsOfDay {
  date: string;
  marking?: Marking[];
  totalHoursByDay: number;
}

const Home = () => {
  const { user } = useSidebar();
  const [open, setOpen] = useState(false);
  const apiUrl = "https://localhost:7083/User/update-password";
  const apiUrl2 = "https://localhost:7083/Marking";
  const token = getAuthToken();

  const [markingsOfDay, setMarkingsOfDay] = useState<MarkingsOfDay>();

  const [formData, setFormData] = useState<ResetePasswordData>({
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
    axios
      .put(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
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

  useEffect(() => {
    setOpen(user?.isFirstLogin ? user.isFirstLogin : false);
  }, [user]);

  useEffect(() => {
    axios
      .get(apiUrl2, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        const markings = response.data;
        setMarkingsOfDay(markings);
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
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <SideBar />
        <Card>
          <Content notMarkTime={false}>
            <ContentHeader>
              <h1>Marcação Dia</h1>
              <Button color="#fff" text="Marcar Ponto" link="/markTime" />
            </ContentHeader>
            {markingsOfDay?.marking && markingsOfDay.marking?.length > 0 ? (
              <>
                <Clock />
                <ContentMarkTime>
                  {markingsOfDay.marking.map((item, index) => (
                    <MarkTime
                      time={
                        item.hour
                          ? new Date(item.hour).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""
                      }
                      orderMark={
                        index == 0
                          ? "1° Entrada"
                          : index == 1
                          ? "1° Saída"
                          : index == 2
                          ? "2° Entrada"
                          : "2° Saída"
                      }
                    />
                  ))}
                </ContentMarkTime>
              </>
            ) : (
              <ContentNotMarkTime>
                <img src={Logo3} />
                <span>Não houve marcações na data de hoje.</span>
              </ContentNotMarkTime>
            )}
          </Content>
        </Card>
      </Container>
      <Modal open={open}>
        <Box>
          <h2 style={{ margin: "0", textAlign: "center" }}>Olá, Ramires</h2>
          <span>
            Por motivos de segurança, pedimos que defina uma nova senha para
            continuar.
          </span>
          <div
            style={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
              gap: "2rem",
            }}
          >
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
            <div style={{ display: "flex", alignSelf: "center" }}>
              <Button
                color="#fff"
                text="Salvar"
                onClick={handleResetePasswordClick}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Home;
