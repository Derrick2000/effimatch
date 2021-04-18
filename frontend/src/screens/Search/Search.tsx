import React from 'react';

// componenet
import Card from '../../components/Card/Card';
import LoadCard from '../../components/LoadCard/LoadCard';
import SearchBar from '../../components/SearchBar/SearchBar';

// antd
import { Row, Col } from 'antd';
import { Tag } from 'antd';
import { Skeleton } from 'antd';
import TweenOne from 'rc-tween-one';
import { TweenOneGroup } from 'rc-tween-one';



// assets (temp)
import MS_logo from '../../images/MS_logo.png';
import Avatar from '../../images/avatar.png';

// style
import './styles/search.less';

interface CardData {
    title: string,
    company: string,
    avatar: string,
    logo: string,
    name: string
}

const { CheckableTag } = Tag;

const RenderCards = (cardsData: CardData[], header: boolean, load: boolean) => {

    return (
        <div className='search-cards-wrapper'>
            
            {header && <div className='search-cards-title'>
                <h1 className='search-cards-title-h1'>Recent Jobs</h1>
            </div>}
            <Row justify='space-between'>
                {cardsData.map((item: CardData, i: number) => 
                (
                    <Col md={6} xs={24} className='search-cards-block' key={i.toString()}>
                
                        {!load ? 
                            <Card 
                            title={item.title}
                            company={item.company}
                            logo={item.logo}
                            avatar={item.avatar}
                            name={item.name}
                            />
                        :
                            <LoadCard></LoadCard>
                        }
                        
                    </Col>
                    
                ))}
            </Row>
            
        </div>
    )
}


const Search: React.FC<any> = () => {
    const [search, setSearch] = React.useState(false);
    const [header, setHeader] = React.useState(true);
    const [load, setLoad] = React.useState(false);
    const [jobTag, setJob] = React.useState(["Internship", "San Diego"]);


    const wait=(ms:number)=>new Promise(resolve => setTimeout(resolve, ms)); 

    const onClickSearch = async (value : string) => {
        
        // if not empty, add input as job tag
        if(value !== ''){
            setJob(jobTag => [...jobTag, value]);
        }

        setHeader(false);
        setLoad(true);
        setSearch(false);
        await wait(2000);
        setLoad(false);
        setSearch(true);
    };

    

    const handleClose = (removedItem: String, jobTag: string[]) => {
        var alternJobTag = jobTag.filter(word => word !== removedItem);
        setJob(alternJobTag);
    }


    return (
        <div className="search-wrapper">
            <div className="search-content-wrapper">
                <TweenOne 
                    animation={{ x: 200, type: 'from', ease: 'linear' }}
                >
                <SearchBar 
                    buttonWidth={150}
                    search={onClickSearch}
                />
                </TweenOne>
                
                <TweenOne
                    animation={{ x: -200, type: 'from', ease: 'linear' }}
                >
                    {search && 

                        // handle close for tags
                        <div className='search-tags-wrapper'>
                            <Row justify='start'>
                                {jobTag.map((item: String, i: number) => (
                                    <Col className='search-tags-block' key={i.toString()}>
                                        <Tag closable 
                                              onClose={() => handleClose(item, jobTag)}
                                              className='search-tags-tag'
                                        >
                                            {item}
                                        </Tag>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    
                    
                    }
                    
                    {RenderCards(cardData, header, load)}
                </TweenOne>
            </div>

        </div>
    )
}

const cardData: CardData[] = [];

for (let ii = 0; ii < 6; ii++) {
    cardData.push(
        {
            title: 'Design Positions',
            company: 'Microsoft',
            name: 'referer 1',
            logo: MS_logo,
            avatar: Avatar
        }
    )
}






export default Search;