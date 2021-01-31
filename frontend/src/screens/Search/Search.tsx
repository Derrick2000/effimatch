// TODO: 根据要求完成这个page
// 你应该会需要用到 components 里面的 Card

import React from 'react';

// componenet
import Card from '../../components/Card/Card';
import SearchBar from '../../components/SearchBar/SearchBar';

// antd
import { Row, Col } from 'antd';
import { Tag } from 'antd';
import { Skeleton } from 'antd';
import TweenOne from 'rc-tween-one';


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

const RenderCards = (cardsData: CardData[], search: boolean, load: boolean) => {

    return (
        <div className='search-cards-wrapper'>
            
            {!search && <div className='search-cards-title'>
                <h1 className='search-cards-title-h1'>Recent Jobs</h1>
            </div>}
            <Row justify='space-between'>
                {cardsData.map((item: CardData, i: number) => 
                (
                    <Col md={8} xs={24} className='search-card-block' key={i.toString()}>

                        <Skeleton active loading={load} paragraph={{width:1}}>
                            <Card 
                                title={item.title}
                                company={item.company}
                                logo={item.logo}
                                avatar={item.avatar}
                                name={item.name}
                            />
                        </Skeleton>
                    </Col>
                    
                ))}
            </Row>
            
        </div>
    )
}

const RenderTags: React.FC<String[]> = (jobTag: String[]) => {

    return (
        <div className='search-tags-wrapper'>
            <Row justify='start'>
                {jobTag.map((item: String, i: number) => (
                    <Col className='search-tags-block' key={i.toString()}>
                        {i !== jobTag.length - 1 ? 
                            <Tag closable 
                              className='search-tags-tag'
                              onClose={() => console.log("Closing...")}
                            >
                              {item}
                            </Tag>
                        :
                            <CheckableTag
                              className='search-tags-remote-tag'
                              checked={false}
                              onChange={checked => console.log("Checking...")}
                            >
                              {item}
                            </CheckableTag>
                        }
                    </Col>
                ))}

            </Row>

        </div>
    )
}


const Search: React.FC<any> = () => {
    const [search, setSearch] = React.useState(false);
    const [load, setLoad] = React.useState(false);

    const wait=(ms:number)=>new Promise(resolve => setTimeout(resolve, ms)); 

    const onClickSearch = async () => {
        setLoad(true);
        setSearch(false);
        await wait(2000);
        setLoad(false);
        setSearch(true);
    };

    return (
        <div className="search-wrapper">
            <div className="search-content-wrapper">
                <TweenOne 
                    animation={{ x: 400, type: 'from', ease: 'linear' }}
                >
                <SearchBar 
                    search={onClickSearch}
                />

                {search &&
                RenderTags(jobTag)}
                
                {RenderCards(cardData, search, load)}
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


const jobTag: String[] = ["Internship", "San Diego", "Remote"];



export default Search;