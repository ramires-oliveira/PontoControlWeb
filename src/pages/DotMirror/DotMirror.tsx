import {
  Container,
  ContentHeader,
  ContentFilter,
  ContentTable,
  FilterData,
  FilterActions,
} from "./styles";
import NavBar from "../../components/NavBar/Index";
import SideBar from "../../components/SideBar/Index";
import Card from "../../components/Card/Index";
import Button from "../../components/Button/Index";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameMonth,
  isSaturday,
  isSunday,
  startOfMonth,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import Holidays from "date-holidays";

const DotMirror = () => {
  const [selectedDateInitial, setSelectedDateInitial] = useState(null);
  const [selectedDateFinal, setSelectedDateFinal] = useState(null);

  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const generateDaysArray = (startDate: Date, endDate: Date): Date[] => {
    return eachDayOfInterval({ start: startDate, end: endDate });
  };

  const formatDay = (day: Date): string => {
    return format(day, "dd/MM/yyyy - E", { locale: ptBR });
  };

  const daysArray = generateDaysArray(firstDayOfMonth, currentDate);

  const hd = new Holidays();
  hd.init("BR");

  return (
    <>
      <NavBar />
      <Container>
        <SideBar />
        <Card>
          <ContentHeader>
            <h1>Espelho de Ponto</h1>
          </ContentHeader>
          <ContentFilter>
            <FilterData>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Início"
                  format="DD/MM/YYYY"
                  value={selectedDateInitial}
                  onChange={(newValue) => setSelectedDateInitial(newValue)}
                />
                <DatePicker
                  label="Fim"
                  value={selectedDateFinal}
                  onChange={(newValue) => setSelectedDateFinal(newValue)}
                />
              </LocalizationProvider>
            </FilterData>
            <FilterActions>
              <Button color="#fff" text="Filtrar" />
              <Button color="#fff" text="Exportar" icon />
            </FilterActions>
          </ContentFilter>
          <ContentTable>
            <div className="content">
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Dia</TableCell>
                      <TableCell>1° Entrada</TableCell>
                      <TableCell>1° Saída</TableCell>
                      <TableCell>2° Entrada</TableCell>
                      <TableCell>2° Entrada</TableCell>
                      <TableCell>Quant. Horas</TableCell>
                      <TableCell>Banco de Horas</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {daysArray.map((day, index) => {
                      const isHoliday = hd.isHoliday(day);
                      const isSaturdayDay = isSaturday(day);
                      const isSundayDay = isSunday(day);
                      const cellClass = isHoliday
                        ? "holiday-cell"
                        : isSaturdayDay || isSundayDay
                        ? "dayOff-cell"
                        : "";
                      return (
                        <TableRow>
                          <TableCell key={index}>
                            {isSameMonth(day, firstDayOfMonth) &&
                              formatDay(day).slice(0, 16)}
                          </TableCell>
                          <TableCell className={cellClass}>
                            {cellClass === "holiday-cell"
                              ? "Feriado"
                              : cellClass === "dayOff-cell"
                              ? "Folga"
                              : "09:00"}
                          </TableCell>
                          <TableCell className={cellClass}>
                            {cellClass === "holiday-cell"
                              ? "Feriado"
                              : cellClass === "dayOff-cell"
                              ? "Folga"
                              : "09:00"}
                          </TableCell>
                          <TableCell className={cellClass}>
                            {cellClass === "holiday-cell"
                              ? "Feriado"
                              : cellClass === "dayOff-cell"
                              ? "Folga"
                              : "09:00"}
                          </TableCell>
                          <TableCell className={cellClass}>
                            {cellClass === "holiday-cell"
                              ? "Feriado"
                              : cellClass === "dayOff-cell"
                              ? "Folga"
                              : "09:00"}
                          </TableCell>
                          <TableCell>00:00</TableCell>
                          <TableCell>00:00</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </ContentTable>
        </Card>
      </Container>
    </>
  );
};

export default DotMirror;
