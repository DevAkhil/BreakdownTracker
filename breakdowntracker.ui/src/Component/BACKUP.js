import {
  TableCell,
  TableHead,
  Table,
  TableContainer,
  Paper,
  Button,
  TableRow,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
  Dialog,
  TableBody,
  TablePagination,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import {
  CreateBreakdown,
  FetchBreakdownByRef,
  GetAllBreakdowns,
  UpdateBreakdown,
} from "../Redux/ActionCreater";
import { connect, useDispatch, useSelector } from "react-redux";
import { OpenPopup } from "../Redux/Action";
import dayjs from "dayjs";

const asd = (props) => {
  const columns = [
    { id: "breakdownReference", name: "Breakdown Reference" },

    { id: "companyName", name: "Company Name" },
    { id: "driverName", name: "Driver Name" },
    { id: "registrationNumber", name: "Registration Number" },
    { id: "breakdownDate", name: "Breakdown Date" },
    { id: "action", name: "Action" },
  ];
  const dispatch = useDispatch();
  const [breakdownReference, breakdownReferenceChange] = useState("");
  const [companyName, companyNameChange] = useState("");
  const [driverName, driverNameChange] = useState("");
  const [registrationNumber, registrationNumberChange] = useState("");
  const [breakdownDate, breakdownDateChange] = useState( dayjs());
  const [rowPerPage, rowPerPageChange] = useState(5);
  const [page, pageChange] = useState(0);
  const [open, openChange] = useState(false);
  const [isEdit, isEditChange] = useState(false);
  const [title, titleChange] = useState("Create Breakdown");

  const editObj = useSelector((state) => state.breakdown.breakdownObj);

  useEffect(() => {

    if (Object.keys(editObj).length > 0) {
      breakdownReferenceChange(editObj.breakdownReference)
      companyNameChange(editObj.companyName);
      driverNameChange(editObj.driverName);
      registrationNumberChange(editObj.registrationNumber);
      breakdownDateChange(dayjs(editObj.breakdownDate));
    } else {
      clearState();
    }
  }, [editObj]);

  const handlePageChange = (event, newPage) => {
    pageChange(newPage);
  };

  const handleRowPerPageChange = (event) => {
    rowPerPageChange(+event.target.value);
    pageChange(0);
  };
  const functionAdd = () => {
    isEditChange(false);
    titleChange("Create Breakdown");
    openPopup();
  };
  const closePopup = () => {
    openChange(false);
  };
  const openPopup = () => {
    openChange(true);
    clearState()
    dispatch(OpenPopup());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const _obj = { companyName, driverName, registrationNumber, breakdownDate };
    if(isEdit){
      dispatch(UpdateBreakdown(breakdownReference, _obj));
    }
    else{
      dispatch(CreateBreakdown(_obj));
    }
    closePopup();
  };

  const clearState = () => {
    companyNameChange("");
    driverNameChange("");
    registrationNumberChange("");
    breakdownDateChange(dayjs());
  };
  const handleEdit = (code) => {
    isEditChange(true);
    titleChange("Update Breakdown");
    openChange(true);
    dispatch(FetchBreakdownByRef(code));
  };

  useEffect(() => {
    props.loadbreakdown();
  }, []);

  return (
    <div>
      <Paper style={{ margin: "1%" }}>
        <div style={{ margin: "1%" }}>
          <Button variant="contained" onClick={functionAdd}>
            Create Breakdown{" "}
          </Button>
        </div>

        <div style={{ margin: "1%" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "red" }}>
                  {columns.map((column) => (
                    <TableCell key={column.id} style={{ color: "white" }}>
                      {column.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.breakdownstate.breakdownList &&
                  props.breakdownstate.breakdownList
                    .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                    .map((row, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell>{row.breakdownReference}</TableCell>
                          <TableCell>{row.companyName}</TableCell>
                          <TableCell>{row.driverName}</TableCell>
                          <TableCell>{row.registrationNumber}</TableCell>
                          <TableCell>{row.breakdownDate}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={(e) => {
                                handleEdit(row.breakdownReference);
                              }}
                            >
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            rowsPerPage={rowPerPage}
            page={page}
            count={props.breakdownstate.breakdownList.length}
            component={"div"}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowPerPageChange}
          ></TablePagination>
        </div>
      </Paper>
      <Dialog open={open} onClose={closePopup} fullWidth maxWidth="sm">
        <DialogTitle>
          <span>{title}</span>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} margin={2}>
              <TextField
                required
                error={companyName.length === 0}
                value={companyName}
                name={companyName}
                onChange={(e) => {
                  companyNameChange(e.target.value);
                }}
                variant="outlined"
                label="Company Name"
              ></TextField>
              <TextField
                required
                error={driverName.length === 0}
                value={driverName}
                name={driverName}
                onChange={(e) => {
                  driverNameChange(e.target.value);
                }}
                variant="outlined"
                label="Driver Name"
              ></TextField>
              <TextField
                required
                error={registrationNumber.length === 0}
                name={registrationNumber}
                value={registrationNumber}
                onChange={(e) => {
                  registrationNumberChange(e.target.value);
                }}
                variant="outlined"
                label="Registration Number"
              ></TextField>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  required
                  value={breakdownDate ? breakdownDate : null}
                  onChange={(newValue) => {
                    breakdownDateChange(newValue);
                  }}
                />
              </LocalizationProvider>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
const mapStatetoProps = (state) => {
  return {
    breakdownstate: state.breakdown,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    loadbreakdown: () => dispatch(GetAllBreakdowns()),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Breakdown);
