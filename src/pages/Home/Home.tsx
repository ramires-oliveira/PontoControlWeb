import { Container, Content, ContentHeader, ContentMarkTime } from "./styles";
import { NavBar } from "../../components/NavBar/Index";
import Card from "../../components/Card/Index";
import Button from "../../components/Button/Index";
import Clock from "../../components/Clock/Index";
import MarkTime from "../../components/MarkTime/Index";
import { Box, Modal, TextField } from "@mui/material";
import { useState } from "react";
import SideBar from "../../components/SideBar/Index";
import Logo3 from "../../assets/images/Logo_3.png";

const Home = () => {
  const [open, setOpen] = useState(true);

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
            <Clock />
            <ContentMarkTime>
              <MarkTime time="09:00" orderMark="1° Entrada" />
              <MarkTime time="12:00" orderMark="1° Saída" />
              <MarkTime time="13:00" orderMark="2° Entrada" />
              <MarkTime time="18:00" orderMark="2° Saída" />
            </ContentMarkTime>
            {/* <ContentNotMarkTime>
              <img src={Logo3} />
              <span>Não houve marcações na data de hoje.</span>
            </ContentNotMarkTime> */}
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
            <TextField label="Nova Senha" variant="outlined" />
            <TextField label="Nova Senha" variant="outlined" />
            <div style={{ display: "flex", alignSelf: "center" }}>
              <Button color="#fff" text="SALVAR" />
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Home;
