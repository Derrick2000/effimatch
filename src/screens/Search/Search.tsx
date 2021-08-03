import React from 'react';

// componenet
import Card from '../../components/Card/Card';
import LoadCard from '../../components/LoadCard/LoadCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import {useRequest} from 'apis/useRequest';
import {getAllJobsUsingGet} from 'apis/effimatch';

// antd
import {Row, Col} from 'antd';
import {Tag} from 'antd';
import TweenOne from 'rc-tween-one';

// assets (temp)
import MS_logo from 'images/MS_logo.png';
import Avatar from 'images/avatar.png';

// style
import './styles/search.less';

interface CardData {
  title: string;
  company: string;
  avatar: string;
  logo: string;
  name: string;
  id: number;
}

const RenderCards = (cardsData: CardData[], header: boolean, load: boolean) => {
  return (
    <div className="search-cards-wrapper">
      {header && (
        <div className="search-cards-title">
          <h1 className="search-cards-title-h1">Recent Jobs</h1>
        </div>
      )}
      <Row justify="space-between">
        {cardsData.map((item: CardData, i: number) => (
          <Col md={6} xs={24} className="search-cards-block" key={i.toString()}>
            {!load ? (
              <Card
                title={item.title}
                company={item.company}
                logo={item.logo}
                avatar={item.avatar}
                name={item.name}
                id={item.id}
              />
            ) : (
              <LoadCard></LoadCard>
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
};

const Search: React.FC<any> = () => {
  const [, setSearch] = React.useState(false);
  const [header, setHeader] = React.useState(true);
  const [load, setLoad] = React.useState(false);
  const [jobTag, setJob] = React.useState(new Array<string>()); // edited by William. The initial jobTab array should be empty
  const [cardData, setCardData] = React.useState<CardData[]>([]);

  const [getCardData] = useRequest(getAllJobsUsingGet, {
    onSuccess: d => {
      const cards: CardData[] = [];
      for (let ii = 0; ii < d.data.length; ii++) {
        cards.push({
          title: d.data[ii].jobTitle || 'Design Positions',
          company: d.data[ii].companyName || 'Microsoft',
          name: 'referer 1',
          logo: d.data[ii].companyLogo || MS_logo,
          avatar: Avatar,
          id: d.data[ii].id || 0,
        });
      }
      setCardData(cards);
    },
    onFail: e => {
      console.log(e);
    },
  });

  React.useEffect(() => {
    const fetchData = async () => {
      await getCardData({pageNum: undefined, pageSize: 3, search: undefined});
    };
    fetchData();
  }, [getCardData]);

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const onClickSearch = async (value: string) => {
    // if not empty, add input as job tag
    if (value !== '') {
      setJob(jobTag => [...jobTag, value]);
    }

    setHeader(false);
    setLoad(true);
    setSearch(false);
    await wait(2000);
    setLoad(false);
    setSearch(true);
  };

  const handleClose = (removedItem: string, jobTag: string[]) => {
    const alternJobTag = jobTag.filter(word => word !== removedItem);
    setJob(alternJobTag);
  };

  return (
    <div className="search-wrapper">
      <div className="search-content-wrapper">
        <TweenOne animation={{x: 200, type: 'from', ease: 'linear'}}>
          <SearchBar buttonWidth={150} search={onClickSearch} />
        </TweenOne>

        <TweenOne animation={{x: -200, type: 'from', ease: 'linear'}}>
          {/* Edited by William. Also need to display tags when search is in progress */}
          <div className="search-tags-wrapper">
            <Row justify="start">
              {jobTag.map((item: string, i: number) => (
                <Col className="search-tags-block" key={i.toString()}>
                  <Tag
                    closable
                    onClose={() => handleClose(item, jobTag)}
                    className="search-tags-tag">
                    {item}
                  </Tag>
                </Col>
              ))}
            </Row>
          </div>

          {RenderCards(cardData, header, load)}
        </TweenOne>
      </div>
    </div>
  );
};

export default Search;
