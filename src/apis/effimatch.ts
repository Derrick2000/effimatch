import {createRequestConfig} from 'apis/createRequestConfig';

/**
 * addCompany
 */
export const addCompanyUsingPost = createRequestConfig<{
  requestBody: Company;
}>('addCompanyUsingPost', ({requestBody}) => ({
  url: `/v1/companies`,
  method: 'POST',
  data: requestBody,
  headers: {'Content-Type': 'application/json'},
}));

/**
 * addJob
 */
export const addJobUsingPost = createRequestConfig<{
  requestBody: Job;
}>('addJobUsingPost', ({requestBody}) => ({
  url: `/v1/jobs`,
  method: 'POST',
  data: requestBody,
  headers: {'Content-Type': 'application/json'},
}));

/**
 * changeRole
 */
export const changeRoleUsingPost = createRequestConfig<{
  requestBody: ChangeApplicationUserRoleRequest;
}>('changeRoleUsingPost', ({requestBody}) => ({
  url: `/v1/users/change-role`,
  method: 'POST',
  data: requestBody,
  headers: {'Content-Type': 'application/json'},
}));

/**
 * deleteJob
 */
export const deleteJobUsingDelete = createRequestConfig<{
  id: number;
}>('deleteJobUsingDelete', ({id}) => ({
  url: `/v1/jobs/${id}`,
  method: 'DELETE',
}));

/**
 * finishedInitialSettings
 */
export const finishedInitialSettingsUsingPost = createRequestConfig(
  'finishedInitialSettingsUsingPost',
  () => ({
    url: `/v1/users/finished-initial-settings`,
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
  }),
);

/**
 * finishedTutorial
 */
export const finishedTutorialUsingPost = createRequestConfig(
  'finishedTutorialUsingPost',
  () => ({
    url: `/v1/users/finished-tutorial`,
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
  }),
);

/**
 * getAllCompanies
 */
export const getAllCompaniesUsingGet = createRequestConfig<
  undefined,
  Company[]
>('getAllCompaniesUsingGet', () => ({
  url: `/v1/companies`,
  method: 'GET',
}));

/**
 * getAllJobs
 */
export const getAllJobsUsingGet = createRequestConfig<
  {
    pageNum?: number;
    pageSize?: number;
    search?: string;
  },
  Job[]
>('getAllJobsUsingGet', ({pageNum, pageSize, search}) => ({
  url: `/v1/jobs`,
  method: 'GET',
  params: {
    pageNum,
    pageSize,
    search,
  },
}));

/**
 * getOwnInformation
 */
export const getOwnInformationUsingGet = createRequestConfig<
  undefined,
  ApplicationUser
>('getOwnInformationUsingGet', () => ({
  url: `/v1/users/get-own`,
  method: 'GET',
}));

/**
 * login
 */
export const loginUsingPost = createRequestConfig<
  {
    requestBody: LoginRequest;
  },
  AuthenticationTokenResponse
>('loginUsingPost', ({requestBody}) => ({
  url: `/v1/authentication/login`,
  method: 'POST',
  data: requestBody,
  headers: {'Content-Type': 'application/json'},
}));

/**
 * register
 */
export const registerUsingPost = createRequestConfig<{
  requestBody: RegistrationRequest;
}>('registerUsingPost', ({requestBody}) => ({
  url: `/v1/authentication/register`,
  method: 'POST',
  data: requestBody,
  headers: {'Content-Type': 'application/json'},
}));

/**
 * sendVerification
 */
export const sendVerificationUsingPost = createRequestConfig<{
  requestBody: RegistrationRequest;
}>('sendVerificationUsingPost', ({requestBody}) => ({
  url: `/v1/authentication/send-verification`,
  method: 'POST',
  data: requestBody,
  headers: {'Content-Type': 'application/json'},
}));

/**
 * updateJobById
 */
export const updateJobByIdUsingPut = createRequestConfig<{
  id: number;
  requestBody: Job;
}>('updateJobByIdUsingPut', ({id, requestBody}) => ({
  url: `/v1/jobs/${id}`,
  method: 'PUT',
  data: requestBody,
  headers: {'Content-Type': 'application/json'},
}));

export interface ApplicationUser {
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authorities?: GrantedAuthority[];
  credentialsNonExpired?: boolean;
  enabled?: boolean;
  finishedInitialSettings?: boolean;
  finishedTutorial?: boolean;
  nickname?: string;
  password?: string;
  username?: string;
}

export interface AuthenticationTokenResponse {
  token?: string;
}

export interface ChangeApplicationUserRoleRequest {
  newRole?: string;
}

export interface Company {
  companyName?: string;
  id?: number;
  logoUrl?: string;
}

export interface GrantedAuthority {
  authority?: string;
}

export interface Job {
  applicationDeadline?: string;
  companyLogo?: string;
  companyName?: string;
  createdAt?: string;
  id?: number;
  jobDescription?: string;
  jobLink?: string;
  jobTitle?: string;
  location?: string;
  publisherEmail?: string;
  requiredExperience?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface RegistrationRequest {
  code?: string;
  email?: string;
  password?: string;
  username?: string;
}
