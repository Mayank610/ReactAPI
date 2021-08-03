import { MenuItem } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import { connect } from "react-redux";
import { Grid, TextField , withStyles, FormControl, InputLabel, Select, Button} from "@material-ui/core";
import { React , useEffect, useState, useRef} from "react";
import useForm from './useForm';
import * as actions from "../actions/dCandidate";

const styles = (theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    FormControl:{
        margin: theme.spacing(1),
            minWidth: 230,
    },
    smMargin:{
        margin: theme.spacing(1),
    }
    
})

const initialFieldValues ={
    fullName: '',
    mobile: '',
    email:'',
    age:'',
    bloodGroup:'',
    address:''
}

const DCandidateForm = ({classes, ...props}) => {

    const validate = (fieldValues = values) => {
        let temp={}

        if('fullName' in fieldValues)
        temp.fullName = fieldValues.fullName? "":"This field is required."

        if('mobile' in fieldValues)
        temp.mobile = fieldValues.mobile? "":"This field is required."

        if('bloodGroup' in fieldValues)
        temp.bloodGroup = fieldValues.bloodGroup? "":"This field is required."

        if('email' in fieldValues)
        temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid"
        
        setErrors({
            ...temp
        })

        if(fieldValues===values)
        // Return true if there is no error (Using Temp Object)
            return Object.values(temp).every(x => x == "")
    }

    const{
        values,
        setValues,
        handleInputChange,
        errors,
        setErrors
    } = useForm(initialFieldValues, validate)

    //Material-ui select
    const inputLabel = useRef(null);
    const[labelWidth, setLabelWidth] = useState(0);
    useEffect(()=>{
        setLabelWidth(inputLabel.current.offsetwidth);
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(validate())
        {
            if(props.currentId == 0)
           props.createDCandidate(values, ()=> {window.alert('inserted')})

           else
           props.updateDCandidate(props.currentId, values, () => {window.alert('updated')})
        }
        
    }

    useEffect(() => {
        if(props.currentId !== 0)
        {
        setValues({
            ...props.dCandidateList.find(x=> x.id === props.currentId)
        }) 
        console.log(props.dCandidateList)
        console.log(props.dCandidateList.find(x=> x.id === props.currentId))
    }
        //console.log(props.currentId)
    },[props.currentId])

    return(
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="fullName"
                        variant="outlined"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        {...(errors.fullName && {error: true, helperText: errors.fullName})}
                    />

                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && {error: true, helperText: errors.email})}
                    />

                    <FormControl variant="outlined" className={classes.FormControl}
                    {...(errors.bloodGroup && {error: true} )}
                    >
                        <InputLabel ref={inputLabel} >Blood Group</InputLabel>
                        <Select
                        name="bloodGroup"            
                        value={values.bloodGroup}
                        onChange={handleInputChange}
                        labelWidth = {labelWidth}
                        >
                            <MenuItem value=""> Select Blood Group</MenuItem>
                            <MenuItem value="A+">A +ve </MenuItem>
                            <MenuItem value="A-">A -ve</MenuItem>
                            <MenuItem value="B+">B +ve</MenuItem>
                            <MenuItem value="B-">B -ve</MenuItem>
                            <MenuItem value="AB+">AB +ve</MenuItem>
                            <MenuItem value="AB-">AB -ve</MenuItem>
                            <MenuItem value="O+">O +ve</MenuItem>
                            <MenuItem value="O-">O -ve</MenuItem>

                        </Select>
                        {errors.bloodGroup && <FormHelperText>
                            {errors.bloodGroup}
                            </FormHelperText>}
                    </FormControl>
                    
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        name="mobile"
                        variant="outlined"
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        {...(errors.mobile && {error: true, helperText: errors.mobile})}
                    />
                    <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="address"
                        variant="outlined"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                    />

                    <div>
                        <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                        variant="contained"
                        className={classes.smMargin}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps = state => ({
    dCandidateList: state.dCandidate.list
})

const mapActionToProp = {
    createDCandidate: actions.create,
    updateDCandidate: actions.update
}

export default connect(mapStateToProps, mapActionToProp) (withStyles(styles)(DCandidateForm));