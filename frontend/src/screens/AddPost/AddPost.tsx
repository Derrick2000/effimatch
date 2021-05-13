import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// componenet
import InputBar from '../../components/InputBar/InputBar';

// antd
import { Button, Select, Radio, Row, Col, Input, DatePicker } from 'antd';

// style
import './styles/addpost.less';


// redux
import { useSelector } from 'react-redux'
import { setCurrentUser, logoutUser } from '../../actions/authAction'

const RadioGroup = Radio.Group;

const AddPost: React.FC<any> = () => {

    const [type, setType ] = React.useState(0);
    const [position, setPosition] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [date, setDate] = React.useState('');
    const [value, setValue] = React.useState('');

    const onInputPosition = (value : string) => {
        if(value !== ""){
            setPosition(value);
        }
    }

    const onInputLocation = (value : string) => {
        if(value !== ""){
            setLocation(value);
        }
    }

    const onInputCompany = (value : string) => {
        if(value !== ""){
            setCompany(value);
        }
    }

    const onInputDate = (date : any, dateString : string) => {
        setDate(dateString);
        console.log(dateString);
    }


    const onSave = () => {
        // print what user input
        console.log({
            value: value,
            type: type,
            position: position,
            location: location,
            company: company,
            date: date
        });

        // go /#
        window.location.href = '/#';
    }

    const onChange = (e : any) => {
        setType(e.target.value);
    }


    return(
        <div className='addpost-wrapper'>
            <div className='addpost-content'>
                <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css"></link>

                <p className='addpost-content-header'><strong>Job Description</strong></p>

                <ReactQuill theme="snow" value={value} onChange={setValue} className='addpost-content-box' />


                <p className='addpost-content-question'><strong>Required year of experience:</strong></p>
                <RadioGroup  
                    onChange={onChange} 
                    value={type}
                >
                    <Radio value={1} className='addpost-content-radio'>Internship</Radio>
                    <Radio value={2} className='addpost-content-radio'>New Grad</Radio>
                    <Radio value={3} className='addpost-content-radio'>Senior</Radio>
                </RadioGroup>


                <p className='addpost-content-question'><strong>Add job link here</strong></p>
                <InputBar
                    input={onInputPosition}
                    placehold="Type a position to start"
                    autocomplete={false}
                />

                <p className='addpost-content-question'><strong>Location(s)</strong></p>
                <InputBar
                    input={onInputLocation}
                    placehold="Type your current location to start"
                    autocomplete={false}
                />

                <p className='addpost-content-question'><strong>Company</strong></p>
                <InputBar
                    input={onInputCompany}
                    placehold="Type your company name"
                    autocomplete={false}
                />
                
                <p className='addpost-content-question'><strong>Application deadline</strong></p>
                <DatePicker placeholder="MM/DD/YYYY" className="addpost-content-date" onChange={onInputDate}/>

                <div className="addpost-button">
                    <Button type="primary" onClick={onSave} className="addpost-button-button">Post</Button>
                </div>

            </div>
        </div>
    )
}

export default AddPost;