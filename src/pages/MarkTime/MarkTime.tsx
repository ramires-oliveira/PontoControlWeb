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
import Loading from "../../components/Loading";

interface MarkTimeData {
  hour: Date;
  address: string;
}

const MarkTime = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const token = getAuthToken();

  const handleAddressChange = (newAddress: string) => {
    setCurrentAddress(newAddress);
  };

  const handleMarkTimeClick = async () => {
    setLoading(true);
    const formData: MarkTimeData = {
      hour: new Date(),
      address: currentAddress,
    };

    await axios
      .post(`${import.meta.env.VITE_APP_API_URL}/Marking`, formData, {
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
              {loading && <Loading />}
            </ContentButton>
          </Content>
        </Card>
      </Container>
    </>
  );
};

export default MarkTime;
