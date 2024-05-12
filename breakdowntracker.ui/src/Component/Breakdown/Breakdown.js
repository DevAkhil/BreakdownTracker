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
  } from "../../Redux/ActionCreater";
  import { connect, useDispatch, useSelector } from "react-redux";
  import { OpenPopup } from "../../Redux/Action";
  import dayjs from "dayjs";
  
  const Breakdown = ({ breakdownstate, loadbreakdown }) => {
    const columns = [
      { id: "breakdownReference", name: "Breakdown Reference" },
      { id: "companyName", name: "Company Name" },
      { id: "driverName", name: "Driver Name" },
      { id: "registrationNumber", name: "Registration Number" },
      { id: "breakdownDate", name: "Breakdown Date" },
      { id: "action", name: "Action" },
    ];
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
      breakdownReference: "",
      companyName: "",
      driverName: "",
      registrationNumber: "",
      breakdownDate: dayjs(),
    });
    const [rowPerPage, setRowPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState("Create Breakdown");
  
    const editObj = useSelector((state) => state.breakdown.breakdownObj);
  
    useEffect(() => {
      setFormData((prevData) => ({
        ...prevData,
      }));
  
      if (Object.keys(editObj).length > 0) {
        setFormData({
          breakdownReference: editObj.breakdownReference,
          companyName: editObj.companyName,
          driverName: editObj.driverName,
          registrationNumber: editObj.registrationNumber,
          breakdownDate: dayjs(editObj.breakdownDate),
        });
      } else {
        clearFormData();
      }
    }, [editObj]);
  
    const handlePageChange = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleRowPerPageChange = (event) => {
      setRowPerPage(+event.target.value);
      setPage(0);
    };
  
    const openPopup = () => {
      setOpen(true);
      clearFormData();
      dispatch(OpenPopup());
    };
  
    const closePopup = () => {
      setOpen(false);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (isEdit) {
        dispatch(UpdateBreakdown(formData.breakdownReference, formData));
      } else {
        dispatch(CreateBreakdown(formData));
      }
      closePopup();
    };
  
    const clearFormData = () => {
      setFormData({
        breakdownReference: "",
        companyName: "",
        driverName: "",
        registrationNumber: "",
        breakdownDate: dayjs(),
      });
    };
    const handleCreate = () => {
        setIsEdit(false);
        setTitle("Create Breakdown");
        openPopup();
      };


    const handleEdit = (code) => {
      setIsEdit(true);
      setTitle("Update Breakdown");
      setOpen(true);
      dispatch(FetchBreakdownByRef(code));
    };
  
    useEffect(() => {
      loadbreakdown();
    }, []);
  
    return (
      <div>
        <Paper style={{ margin: "1%" }}>
          <div style={{ margin: "1%"  }}>
            <Button variant="contained" color="secondary" style={{width:"100%", marginTop:"25px"}} onClick={handleCreate}>
              Create Breakdown
            </Button>
          </div>
  
          <div style={{ margin: "1%" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "primary.main", color: "primary.contrastText" }}>
                    {columns.map((column) => (
                      <TableCell key={column.id} style={{ color: "white" }}>
                        {column.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {breakdownstate.breakdownList &&
                    breakdownstate.breakdownList
                      .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                      .map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>{row.breakdownReference}</TableCell>
                          <TableCell>{row.companyName}</TableCell>
                          <TableCell>{row.driverName}</TableCell>
                          <TableCell>{row.registrationNumber}</TableCell>
                          <TableCell>{dayjs(row.breakdownDate).format("DD-MM-YYYY HH:mm A")}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleEdit(row.breakdownReference)}
                            >
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              rowsPerPage={rowPerPage}
              page={page}
              count={breakdownstate.breakdownList.length}
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
                  error={formData.companyName.length === 0}
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  variant="outlined"
                  label="Company Name"
                ></TextField>
                <TextField
                  required
                  error={formData.driverName.length === 0}
                  value={formData.driverName}
                  onChange={(e) =>
                    setFormData({ ...formData, driverName: e.target.value })
                  }
                  variant="outlined"
                  label="Driver Name"
                ></TextField>
                <TextField
                  required
                  error={formData.registrationNumber.length === 0}
                  value={formData.registrationNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, registrationNumber: e.target.value })
                  }
                  variant="outlined"
                  label="Registration Number"
                ></TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    required
                    value={formData.breakdownDate}
                    onChange={(newValue) =>
                      setFormData({ ...formData, breakdownDate: newValue })
                    }
                    format="DD-MM-YY HH:mm A"

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
  
  const mapStatetoProps = (state) => ({
    breakdownstate: state.breakdown,
  });
  
  const mapDispatchtoProps = (dispatch) => ({
    loadbreakdown: () => dispatch(GetAllBreakdowns()),
  });
  
  export default connect(mapStatetoProps, mapDispatchtoProps)(Breakdown);