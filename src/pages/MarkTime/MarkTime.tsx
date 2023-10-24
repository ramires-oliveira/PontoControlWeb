import {
  Container,
  Content,
  ContentHeader,
  ContentMap,
  ContentButton,
} from "./styles";
import NavBar from "../../components/NavBar/Index";
import SideBar from "../../components/SideBar/Index";
import Card from "../../components/Card/Index";
import Clock from "../../components/Clock/Index";
import Button from "../../components/Button/Index";
import Map from "../../components/Map/Index";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { getAuthToken } from "../../auth/authService";

interface MarkTimeData {
  hour: Date;
  address: string;
}

const MarkTime = () => {
  const [currentAddress, setCurrentAddress] = useState("");
  const apiUrl = "https://localhost:7083/Marking";
  const token = getAuthToken();

  const handleAddressChange = (newAddress: string) => {
    setCurrentAddress(newAddress);
  };

  const handleMarkTimeClick = async () => {
    const formData: MarkTimeData = {
      hour: new Date(),
      address: currentAddress,
    };

    await axios
      .post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        Swal.fire({
          title: "Marcação Realizada !",
          text: "Consulte seu espelho de ponto.",
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
              <h1>Incluir Ponto</h1>
            </ContentHeader>
            <ContentMap>
              <Map onAddressChange={handleAddressChange} />
            </ContentMap>
            <Clock />
            <div>
              <hr />
            </div>
            <ContentButton>
              <Button
                color="#fff"
                text="Marcar Ponto"
                onClick={handleMarkTimeClick}
              />
            </ContentButton>
          </Content>
        </Card>
      </Container>
    </>
  );
};

export default MarkTime;
