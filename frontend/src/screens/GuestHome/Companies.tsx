import React from 'react';

// logos
import {ReactComponent as AmazonLogo} from '../../images/amazon.svg';
import {ReactComponent as GoogleLogo} from '../../images/google.svg';
import {ReactComponent as LinkedInLogo} from '../../images/LinkedIn.svg';
import {ReactComponent as FacebookLogo} from '../../images/facebook.svg';

const Companies: React.FC<any> = () => {
    return (
        <div className='companies-wrapper'>
            <h2 className='companies-title'>Connect with referrers at:</h2>

            <div className='companies-logo-holder'>
                <AmazonLogo className='companies-logos'/>
                <GoogleLogo className='companies-logos'/>
                <LinkedInLogo className='companies-logos'/>
                <FacebookLogo className='companies-logos'/>
            </div>

        </div>
    )
}

export default Companies;