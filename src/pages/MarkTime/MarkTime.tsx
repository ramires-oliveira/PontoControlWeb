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

const MarkTime = () => {
  const showSweetAlert = () => {
    Swal.fire({
      title: "Marcação Realizada !",
      text: "Consulte seu espelho de ponto.",
      icon: "success",
      allowOutsideClick: false,
      cancelButtonColor: "#29abe3",
      confirmButtonColor: "#29abe3",
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
              <Map />
            </ContentMap>
            <Clock />
            <div>
              <hr />
            </div>
            <ContentButton>
              <Button
                color="#fff"
                text="Marcar Ponto"
                onClick={showSweetAlert}
              />
            </ContentButton>
          </Content>
        </Card>
      </Container>
    </>
  );
};

export default MarkTime;
