import {createRequestConfig} from 'apis/createRequestConfig';

/**
 * addApplication
 */
export const addApplicationUsingPost = createRequestConfig<{
  requestBody: CreateApplicationRequest;
}>('addApplicationUsingPost', ({requestBody}) => ({
  url: `/v1/applications`,
  method: 'POST',
  data: requestBody,
  headers: {'Content-Type': 'application/json'},
}));

/**
 * addInterest
 */
export const addInterestUsingPost = createRequestConfig<{
  jobId: number;
}>('addInterestUsingPost', ({jobId}) => ({
  url: `/v1/interest/jobs/${jobId}`,
  method: 'POST',
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
 * changeApplicationStatusById
 */
export const changeApplicationStatusByIdUsingPatch = createRequestConfig<{
  applicationId: number;
  requestBody: ChangeApplicationStatusRequest;
}>('changeApplicationStatusByIdUsingPatch', ({applicationId, requestBody}) => ({
  url: `/v1/applications/${applicationId}`,
  method: 'PATCH',
  data: requestBody,
  headers: {'Content-Type': 'application/json'},
}));

/**
 * changePassword
 */
export const changePasswordUsingPatch = createRequestConfig<{
  requestBody: ChangePasswordRequest;
}>('changePasswordUsingPatch', ({requestBody}) => ({
  url: `/v1/users/change-password`,
  method: 'PATCH',
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
 * getAcceptedApplicationsCount
 */
export const getAcceptedApplicationsCountUsingGet = createRequestConfig<
  {
    jobId: number;
  },
  number
>('getAcceptedApplicationsCountUsingGet', ({jobId}) => ({
  url: `/v1/applications/jobs/${jobId}/referred-count`,
  method: 'GET',
}));

/**
 * getAllApplications
 */
export const getAllApplicationsUsingGet = createRequestConfig<
  {
    status: keyof typeof GetAllApplicationsUsingGetStatus;
  },
  ApplicationResponse[]
>('getAllApplicationsUsingGet', ({status}) => ({
  url: `/v1/applications`,
  method: 'GET',
  params: {
    status,
  },
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
  JobCardResponse[]
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
 * getApplicantCards
 */
export const getApplicantCardsUsingGet = createRequestConfig<
  {
    jobId: number;
  },
  ApplicantCardResponse[]
>('getApplicantCardsUsingGet', ({jobId}) => ({
  url: `/v1/applications/jobs/${jobId}/applicants`,
  method: 'GET',
}));

/**
 * getApplicationDetailsById
 */
export const getApplicationDetailsByIdUsingGet = createRequestConfig<
  {
    applicationId: number;
  },
  ApplicationDetailsResponse
>('getApplicationDetailsByIdUsingGet', ({applicationId}) => ({
  url: `/v1/applications/${applicationId}`,
  method: 'GET',
}));

/**
 * getInterestedJobsForCurrentUser
 */
export const getInterestedJobsForCurrentUserUsingGet = createRequestConfig<
  undefined,
  Job[]
>('getInterestedJobsForCurrentUserUsingGet', () => ({
  url: `/v1/interest/jobs-for-current-user`,
  method: 'GET',
}));

/**
 * getInterestedUsersCount
 */
export const getInterestedUsersCountUsingGet = createRequestConfig<
  {
    jobId: number;
  },
  number
>('getInterestedUsersCountUsingGet', ({jobId}) => ({
  url: `/v1/interest/jobs/${jobId}/users-count`,
  method: 'GET',
}));

/**
 * getInterestedUsers
 */
export const getInterestedUsersUsingGet = createRequestConfig<
  {
    jobId: number;
  },
  EffimatchUser[]
>('getInterestedUsersUsingGet', ({jobId}) => ({
  url: `/v1/interest/jobs/${jobId}/users`,
  method: 'GET',
}));

/**
 * getJobById
 */
export const getJobByIdUsingGet = createRequestConfig<
  {
    id: number;
  },
  Job
>('getJobByIdUsingGet', ({id}) => ({url: `/v1/jobs/${id}`, method: 'GET'}));

/**
 * getOwnInformation
 */
export const getOwnInformationUsingGet = createRequestConfig<
  undefined,
  EffimatchUser
>('getOwnInformationUsingGet', () => ({
  url: `/v1/users/get-own`,
  method: 'GET',
}));

/**
 * getOwnJobs
 */
export const getOwnJobsUsingGet = createRequestConfig<
  undefined,
  JobCardResponse[]
>('getOwnJobsUsingGet', () => ({
  url: `/v1/jobs/own`,
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
 * removeInterest
 */
export const removeInterestUsingDelete = createRequestConfig<{
  jobId: number;
}>('removeInterestUsingDelete', ({jobId}) => ({
  url: `/v1/interest/jobs/${jobId}`,
  method: 'DELETE',
}));

/**
 * sendVerification
 */
export const sendVerificationUsingPost = createRequestConfig<{
  requestBody: SendVerificationCodeRequest;
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

export interface ApplicantCardResponse {
  applicationId?: number;
  avatar?: string;
  userId?: number;
  username?: string;
}

export interface ApplicationDetailsResponse {
  applicationStatus?: keyof typeof ApplicationDetailsResponseApplicationStatus;
  avatar?: string;
  email?: string;
  id?: number;
  note?: string;
  username?: string;
}

export enum ApplicationDetailsResponseApplicationStatus {
  'SENT' = 'SENT',
  'ACCEPTED' = 'ACCEPTED',
  'CLOSED' = 'CLOSED',
}

export interface ApplicationResponse {
  companyLogo?: string;
  companyName?: string;
  createdAt?: string;
  jobId?: string;
  jobTitle?: string;
}

export interface AuthenticationTokenResponse {
  token?: string;
}

export interface ChangeApplicationStatusRequest {
  newStatus?: keyof typeof ChangeApplicationStatusRequestNewStatus;
}

export enum ChangeApplicationStatusRequestNewStatus {
  'SENT' = 'SENT',
  'ACCEPTED' = 'ACCEPTED',
  'CLOSED' = 'CLOSED',
}

export interface ChangeApplicationUserRoleRequest {
  newRole?: string;
}

export interface ChangePasswordRequest {
  email?: string;
  newPassword?: string;
  otp?: string;
}

export interface CreateApplicationRequest {
  jobId?: number;
  note?: string;
}

export interface EffimatchUser {
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authorities?: GrantedAuthority[];
  avatar?: string;
  credentialsNonExpired?: boolean;
  enabled?: boolean;
  finishedInitialSettings?: boolean;
  finishedTutorial?: boolean;
  grantedAuthorities?: GrantedAuthority[];
  id?: number;
  jobSeeker?: JobSeeker;
  nickname?: string;
  password?: string;
  referrer?: Referrer;
  username?: string;
}

export enum GetAllApplicationsUsingGetStatus {
  'SENT' = 'SENT',
  'ACCEPTED' = 'ACCEPTED',
  'CLOSED' = 'CLOSED',
}

export interface GrantedAuthority {
  authority?: string;
}

export interface Job {
  active?: boolean;
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

export interface JobCardResponse {
  avatar?: string;
  company_logo?: string;
  company_name?: string;
  id?: number;
  job_title?: string;
  username?: string;
}

export interface JobSeeker {
  id?: number;
  jobType?: keyof typeof JobSeekerJobType;
  location?: string;
  positionTypes?: string[];
  skills?: string[];
}

export enum JobSeekerJobType {
  'INTERNSHIP' = 'INTERNSHIP',
  'FULL_TIME' = 'FULL_TIME',
}

export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface Referrer {
  companyName?: string;
  id?: number;
  location?: string;
  position?: string;
}

export interface RegistrationRequest {
  code?: string;
  email?: string;
  password?: string;
  username?: string;
}

export interface SendVerificationCodeRequest {
  email?: string;
}
