import { useNavigate, useParams } from 'react-router-dom';
import { retrieveTodoApi, updateTodoApi, createTodoApi } from './api/TodoAPIService';
import { useAuth } from './security/AuthContext';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import moment from 'moment/moment';

function TodoComponent() {
    
    const {id} = useParams()

    const[description, setDescription] = useState('');
    const[targetDate, setTargetDate] = useState('');
    
    const authContext = useAuth();

    const navigate = useNavigate();
    
    const username = authContext.username;

    useEffect( 
        () => retrieveTodos() 
    );

    function retrieveTodos(){
        if(id != -1) {
            retrieveTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.log(error))
        }
    }

    function onSubmit(values){
        console.log(values);
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        console.log(todo);
        if(id == -1){
            createTodoApi(username, todo)
            .then( response => {
                //console.log(response)
                navigate('/todos')
            })
            .catch( error => console.log(error))
            return
        }
        updateTodoApi(username, id, todo)
        .then( response => {
            //console.log(response)
            navigate('/todos')
        })
        .catch( error => console.log(error))
    }

    function validate(values){
        let errors = { 
            //description: 'enter a valid description', targetDate: 'enter a valid target date' 
        };
        
        if(values.description.length < 5){
            errors.description = 'Enter at least 5 characters in description';
        }
        if(values.targetDate == null || values.targetDate == '' || !moment(values.targetDate).isValid()){
            errors.targetDate = 'Enter a target date';
        }
        console.log(values);
        return errors;
    }

        // const retrieveTodos = useCallback(() => {
    //     retrieveTodoApi(username, id)
    //     .then(response => {
    //         setDescription(response.data.description)
    //     })
    //     .catch(error => console.log(error))
    //     .finally(() => console.log('cleanup'))
    // }, [username, id] );
    
    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
               <Formik initialValues={{description, targetDate}} 
                    enableReinitialize={true} 
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}
               >
               {
                    (props) => (
                        <Form>
                            <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                            <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field className="form-control" type="text" name="description"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field className="form-control" type="date" name="targetDate" />
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>           
                        </Form>
                    )
               }      
               </Formik>
            </div>
        </div>
    );
}
export default TodoComponent;