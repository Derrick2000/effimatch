import {createRequestConfig} from 'apis/createRequestConfig';

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
 * addTest
 */
export const addTestUsingPost = createRequestConfig<{
  requestBody: Test;
}>('addTestUsingPost', ({requestBody}) => ({
  url: `/v1/tests`,
  method: 'POST',
  data: requestBody,
  headers: {'Content-Type': 'application/json'},
}));

/**
 * addUser
 */
export const addUserUsingPost = createRequestConfig<{
  requestBody: RegistrationRequest;
}>('addUserUsingPost', ({requestBody}) => ({
  url: `/register`,
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
 * getAllTests
 */
export const getAllTestsUsingGet = createRequestConfig<undefined, Test[]>(
  'getAllTestsUsingGet',
  () => ({
    url: `/v1/tests`,
    method: 'GET',
  }),
);

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
 * getTestById
 */
export const getTestByIdUsingGet = createRequestConfig<
  {
    id: number;
  },
  Test
>('getTestByIdUsingGet', ({id}) => ({url: `/v1/tests/${id}`, method: 'GET'}));

/**
 * sendVerificationMuted
 */
export const sendVerificationMutedUsingPost = createRequestConfig<{
  requestBody: RegistrationRequest;
}>('sendVerificationMutedUsingPost', ({requestBody}) => ({
  url: `/v1/send-verification-muted`,
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
  url: `/v1/send-verification`,
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

export interface ChangeApplicationUserRoleRequest {
  newRole?: string;
}

export interface GrantedAuthority {
  authority?: string;
}

export interface Job {
  applicationDeadline?: Timestamp;
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

export interface RegistrationRequest {
  code?: string;
  email?: string;
  password?: string;
  username?: string;
}

export interface Test {
  content?: string;
  id?: number;
  title?: string;
}

export interface Timestamp {
  date?: number;
  day?: number;
  hours?: number;
  minutes?: number;
  month?: number;
  nanos?: number;
  seconds?: number;
  time?: number;
  timezoneOffset?: number;
  year?: number;
}
