import React from 'react';

// screens and componets 
import NavBar from '../components/NavBar'

import { enquireScreen } from 'enquire-js';

interface Props {

}

const Home: React.FC<Props> = (props: Props) => {
    const [ isMobile, setIsMobile ] = React.useState(false);

    React.useEffect(() => {
        // responsive to mobile screen
        enquireScreen((mobileState: boolean) => {
            setIsMobile(mobileState);
          });
    }, [])

    return (
        <>  
            <NavBar 
                isMobile={isMobile}
            />
        </>
    )
}

export default Home;