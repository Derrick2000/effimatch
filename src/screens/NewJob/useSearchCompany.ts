import {Client} from 'clearbit';

const clearbitClient = new Client({key: process.env.REACT_APP_CLEARBIT_API_KEY});
const CompanyFinder = clearbitClient.NameToDomain;

export default function useSearchCompany(companyName: string) {
  return () => {
    return CompanyFinder.find({name: companyName});
  };
}
