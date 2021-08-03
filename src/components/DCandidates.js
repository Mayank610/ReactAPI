import { Grid ,Button, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup} from "@material-ui/core";
import { React , useEffect, useState} from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import DCandidateForm from "./DCandidateForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";


// Overriding material UI Css Classes
const styles = theme => ({
    root:{
        "& .MuiTableCell-head":{
            fontSize: "1.25rem"
        }
    },
    paper:{
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

//props.classes
// const [classes, ...props] = props

const DCandidates = ({classes,...props}) => {
   const [currentId, setCurrentId] = useState(0);

    useEffect(()=>{
        props.fetchAllDCandidates()
    },[])

    return (
        <Paper className={classes.paper} elevation={5}>
            <Grid container>
                <Grid item xs={6}>
                    <DCandidateForm {...({currentId,setCurrentId })}/> 
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell> Name </TableCell>
                                    <TableCell> Mobile </TableCell>
                                    <TableCell> Blood Group </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                { 
                                    props.dCandidateList.map((record, index)=>{
                                        return(
                                            <TableRow key={index} hover>
                                                <TableCell>{record.fullName}</TableCell>
                                                <TableCell>{record.mobile}</TableCell>
                                                <TableCell>{record.bloodGroup}</TableCell>
                                                <TableCell> 
                                                    <ButtonGroup variant="text">
                                                        <Button><EditIcon color="primary" onClick={() => {setCurrentId(record.id)}} /> </Button>
                                                        <Button><DeleteIcon color="secondary"/> </Button>
                                                    </ButtonGroup>    
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }      
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    dCandidateList: state.dCandidate.list
})

const mapActionToProp = {
    fetchAllDCandidates: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProp) (withStyles(styles)(DCandidates));