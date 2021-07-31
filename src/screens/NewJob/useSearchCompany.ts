import {Client} from 'clearbit';
import {clearbitKey} from 'config';

const clearbitClient = new Client({key: clearbitKey});
const CompanyFinder = clearbitClient.NameToDomain;

export default function useSearchCompany(companyName: string) {
  return () => {
    return CompanyFinder.find({name: companyName});
  };
}
