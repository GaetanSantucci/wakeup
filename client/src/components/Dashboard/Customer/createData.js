'use client';
import { useState } from 'react'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function createData(lastname, firstname, email, phone, booking_info) {

  return {
    lastname,
    firstname,
    email,
    phone,
    history: booking_info?.map((elem => {
      console.log('elem:', elem);
      const date = new Date(elem.booking_date);
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      const formattedDate = date.toLocaleDateString('fr-FR', options);
      return {
        date: formattedDate,
        total: elem.total_amount
      }
    }))
  }
}

function Row({row, isMobile}) {

  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.lastname}
        </TableCell>
        <TableCell align={isMobile? "left" : "right"}>{row.firstname}</TableCell>
        {
          !isMobile && 
            <> 
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
            </>
        }
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              { isMobile && 
                  <>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.phone}</TableCell>
                  </>
              }
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>

                    <TableCell align="right">Total price (€)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history?.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell align="right">{historyRow.total}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}



export default function CollapsibleTable({ rows, isMobile }) {
  const customers = rows.map(elem => createData(elem.lastname, elem.firstname, elem.email, elem.phone, elem.booking_info))

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', m: '0 !important' }}>
      <TableContainer component={Paper} sx={{ m: '0 !important'}}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Nom</TableCell>
              <TableCell align={isMobile ? "left" : "right"}>Prénom</TableCell>
              {
                !isMobile &&
                <>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Téléphone</TableCell>
                </>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              customers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <Row key={row.name} row={row} isMobile={isMobile} />
                ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={customers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

