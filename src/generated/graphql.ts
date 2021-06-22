import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlRequest } from '../utils/api-client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Employee = {
  __typename?: 'Employee';
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  photo: Scalars['String'];
  address: Scalars['String'];
};

export type EmployeeInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  photo: Scalars['String'];
  address: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateProfile?: Maybe<Employee>;
};


export type MutationUpdateProfileArgs = {
  input?: Maybe<EmployeeInput>;
};

export type Query = {
  __typename?: 'Query';
  allEmployee: Array<Employee>;
  employee?: Maybe<Employee>;
  profile: Employee;
};


export type QueryEmployeeArgs = {
  id: Scalars['String'];
};

export type ProfileFragmentFragment = (
  { __typename?: 'Employee' }
  & Pick<Employee, 'name' | 'email' | 'photo'>
);

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = (
  { __typename?: 'Query' }
  & { profile: (
    { __typename?: 'Employee' }
    & ProfileFragmentFragment
  ) }
);

export const ProfileFragmentFragmentDoc = `
    fragment ProfileFragment on Employee {
  name
  email
  photo
}
    `;
export const ProfileDocument = `
    query profile {
  profile {
    ...ProfileFragment
  }
}
    ${ProfileFragmentFragmentDoc}`;
export const useProfileQuery = <
      TData = ProfileQuery,
      TError = unknown
    >(
      variables?: ProfileQueryVariables, 
      options?: UseQueryOptions<ProfileQuery, TError, TData>
    ) => 
    useQuery<ProfileQuery, TError, TData>(
      ['profile', variables],
      graphqlRequest<ProfileQuery, ProfileQueryVariables>(ProfileDocument, variables),
      options
    );