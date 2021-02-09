import React from 'react';

import PopUp from '../../components/PopUp/PopUp';
import { Button } from 'antd';

const PopUpTest: React.FC<any> = () => {
    // testing

    const [test1, setTest1] = React.useState(false);
    const [test2, setTest2] = React.useState(false);
    const [test3, setTest3] = React.useState(false);

    // for button 1
    const show1 = () => {
        setTest1(!test1);
    }

    // for button 2
    const show2 = () => {
        setTest2(!test2);
    }

    // for button 3
    const show3 = () => {
        setTest3(!test3);
    }

    // testing


    return (
        <div >
            <br/><br/><br/><br/>
            <Button onClick={show1}>Click me to show modal</Button>
            <br/><br/>
            <Button onClick={show2}>Click me to show modal with text</Button>
            <br/><br/>
            <Button onClick={show3}>Click me to show modal with text and button</Button>


            {/* Pop up for Button 1 */}
            <PopUp       
                // REQUIRED            
                visiable={test1} 
                setClose={show1}

                // OPTIONAL

                // onClick={() => alert("Testing 1")}
                // text="TESTING TEXT 1"
            
            />

            {/* Pop up for Button 2 */}
             <PopUp       
                // REQUIRED            
                visiable={test2} 
                setClose={show2}

                // OPTIONAL
                
                // onClick={() => alert("Testing 2")}
                text="TESTING TEXT 2"
            
            />

            {/* Pop up for Button 3 */}
             <PopUp       
                // REQUIRED            
                visiable={test3} 
                setClose={show3}

                // OPTIONAL
                onClick={() => alert("TESTING 3")}
                text="TESTING TEXT 3"
            
            />
        </div>
    )
}


export default PopUpTest;