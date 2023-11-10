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
import { useEffect, useState } from "react";
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
  isSameDay,
  isSaturday,
  isSunday,
  startOfMonth,
} from "date-fns";
import { ptBR as pt } from "date-fns/locale";
import Holidays from "date-holidays";
import axios from "axios";
import { getAuthToken } from "../../auth/authService";
import "dayjs/locale/Pt";
import { ptBR } from "@mui/x-date-pickers/locales";
import { AiOutlineClear } from "react-icons/ai";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const locale = ptBR.components.MuiLocalizationProvider.defaultProps.localeText;

interface DowloadExcelMarking {
  listMarkings: MarkingsOfDay[];
}

interface FilterMarking {
  startDate: Date | null;
  endDate: Date | null;
}

interface MarkingResponse {
  hour: Date;
  address: string;
}

interface MarkingsOfDay {
  date: Date | string;
  marking?: MarkingResponse[];
  totalHoursByDay: string | null;
}


const DotMirror = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [markings, setMarkings] = useState<MarkingsOfDay[]>();
  const [formData, setFormData] = useState<FilterMarking>({
    startDate: null,
    endDate: null,
  });

  const [daysArray, setDaysArray] = useState<Date[]>();
  const [initialDaysArray, setInitialDaysArray] = useState<Date[]>([]);

  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const generateDaysArray = (startDate: Date, endDate: Date): Date[] => {
    return eachDayOfInterval({ start: startDate, end: endDate });
  };

  const formatDay = (day: Date): string => {
    let formattedDay = format(day, "dd/MM/yyyy - E", { locale: pt });

    formattedDay = formattedDay.replace(/\b\w/g, (l) => l.toUpperCase());

    if (formattedDay.includes("SáB")) {
      formattedDay = formattedDay.replace("SáB", "Sáb");
    }

    return formattedDay;
  };

  const updateDaysArray = () => {
    if (formData.startDate && formData.endDate) {
      const filteredDaysArray = generateDaysArray(
        new Date(formData.startDate),
        new Date(formData.endDate)
      );
      setDaysArray(filteredDaysArray);
    } else {
      const DaysArray = generateDaysArray(firstDayOfMonth, lastDayOfMonth);
      setDaysArray(DaysArray);
    }
  };

  const hd = new Holidays();
  hd.init("BR");

  const handleChange = (date: Date | null, id: string) => {
    setFormData({
      ...formData,
      [id]: date,
    });
  };

  const handleFilterClick = async () => {
    try {
      const startDate = formData.startDate as Date;
      const endDate = formData.endDate as Date;

      if (startDate === null || endDate === null) {
        Swal.fire({
          title: "Atenção !",
          html: "As datas precisam ser preenchidas.",
          icon: "warning",
          allowOutsideClick: false,
          cancelButtonColor: "#29abe3",
          confirmButtonColor: "#29abe3",
        });

        return;
      }

      if (startDate > endDate) {
        Swal.fire({
          title: "Atenção !",
          html: "Data inicial maior que data final.",
          icon: "warning",
          allowOutsideClick: false,
          cancelButtonColor: "#29abe3",
          confirmButtonColor: "#29abe3",
        });

        return;
      }

      const token = getAuthToken();

      const response = await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/Marking/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMarkings(response.data);
      updateDaysArray();
    } catch (error: any) {
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
    }
  };

  const fetchMarkings = async () => {
    const token = getAuthToken();

    await axios
      .put(`${import.meta.env.VITE_APP_API_URL}/Marking/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        setMarkings(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const handleDowloadExcel = async () => {
    setLoading(true);
    const token = getAuthToken();

    const excel: DowloadExcelMarking = {
      listMarkings: [],
    };
    await returnReportDowload().then((response) => {
      excel.listMarkings = response;
    }).catch(() => {
      setLoading(false);
    });

    await axios
      .put(
        `${import.meta.env.VITE_APP_API_URL}/Marking/download-markings`,
        excel,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));

        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "relatorio.xlsx";
        document.body.appendChild(a);
        a.click();

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMarkings();
  }, []);

  useEffect(() => {
    const initialDaysArray = generateDaysArray(firstDayOfMonth, lastDayOfMonth);
    setDaysArray(initialDaysArray);
    setInitialDaysArray(initialDaysArray);
  }, []);

  const clearMessage = () => {
    formData.startDate = null;
    formData.endDate = null;
  };

  const handleClearFilter = async () => {
    await clearMessage();
    setDaysArray(initialDaysArray);
    fetchMarkings();
  };

  const returnReportDowload = async () => {
    let report: MarkingsOfDay[] = [];
    let filteredMarkings: MarkingsOfDay[] = [];
    if (daysArray) {
      daysArray.map((day) => {
        if (markings) {
          filteredMarkings = markings.filter((item) =>
            isSameDay(new Date(item.date), day)
          );
        }

        if (filteredMarkings.length > 0 && filteredMarkings[0].marking) {
          report.push(filteredMarkings[0]);
        } else {
          report.push({
            date: new Date(format(day, "yyyy-MM-dd")),
            marking: new Array<MarkingResponse>(),
            totalHoursByDay: null,
          });
        }
      });
    }
    return report;
  };

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
                  key="startDate"
                  label="Início"
                  format="DD/MM/YYYY"
                  value={formData.startDate}
                  onChange={(date) => handleChange(date, "startDate")}
                />
                <DatePicker
                  key="endDate"
                  label="Fim"
                  format="DD/MM/YYYY"
                  value={formData.endDate}
                  onChange={(date) => handleChange(date, "endDate")}
                />
                <button onClick={handleClearFilter} className="buttonFilter">
                  <AiOutlineClear />
                </button>
              </LocalizationProvider>
            </FilterData>
            <FilterActions>
              <Button color="#fff" text="Filtrar" onClick={handleFilterClick} />
              <Button
                color="#fff"
                text="Exportar"
                icon
                onClick={() => handleDowloadExcel()}
              />
              {loading && <Loading />}
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {daysArray &&
                      daysArray.map((day, index) => {
                        const isHoliday = hd.isHoliday(day);
                        const isSaturdayDay = isSaturday(day);
                        const isSundayDay = isSunday(day);
                        const cellClass = isHoliday
                          ? "holiday-cell"
                          : isSaturdayDay || isSundayDay
                            ? "dayOff-cell"
                            : "";

                        let daysData: MarkingsOfDay | undefined;

                        if (markings) {
                          daysData = markings.find((item) =>
                            isSameDay(new Date(item.date), day)
                          );
                        }

                        // Verifica o número de marcações disponíveis
                        const numMarkings =
                          daysData && daysData.marking
                            ? daysData.marking.length
                            : 0;

                        // Preenche as células com "00:00" se houver menos de 4 marcações
                        const markingCells =
                          numMarkings < 4
                            ? Array.from({ length: 4 - numMarkings }).fill(
                              "00:00"
                            )
                            : [];

                        return (
                          <TableRow>
                            <TableCell key={index}>
                              {formatDay(day).slice(0, 16)}
                            </TableCell>
                            {daysData && daysData.marking
                              ? (numMarkings < 4
                                ? [...daysData.marking, ...markingCells]
                                : daysData.marking
                              ).map((marking: any, markingIndex: any) => (
                                <>
                                  <TableCell
                                    key={markingIndex}
                                    className={cellClass}
                                  >
                                    {cellClass === "holiday-cell"
                                      ? "Feriado"
                                      : cellClass === "dayOff-cell"
                                        ? "Folga"
                                        : marking && marking.hour
                                          ? new Date(
                                            marking.hour
                                          ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                          })
                                          : "00:00"}
                                  </TableCell>
                                </>
                              ))
                              : [...Array(4)].map((_, markingIndex) => (
                                <TableCell
                                  key={markingIndex}
                                  className={cellClass}
                                >
                                  {cellClass === "holiday-cell"
                                    ? "Feriado"
                                    : cellClass === "dayOff-cell"
                                      ? "Folga"
                                      : "00:00"}
                                </TableCell>
                              ))}
                            <TableCell>
                              {daysData?.totalHoursByDay
                                ? `${daysData?.totalHoursByDay.split(":")[0]}:${daysData?.totalHoursByDay.split(":")[1]
                                }`
                                : "00:00"}
                            </TableCell>
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
