export interface ProblemType {
  id: string;
  name: string;
}

export interface Issue {
  id: string;
  requester: string;
  phone: string;
  city_id: string;
  workstation_id: string;
  email: string;
  date: Date;
  problem_category: {
    id: string;
    name: string;
    description: string;
    problem_types: ProblemType[];
  };
  problem_types: ProblemType[];
}

export interface PostCreateIssueParams {
  requester: string;
  phone: string;
  city_id: string;
  workstation_id: string;
  email: string;
  date: Date;
  problem_category_id: string;
  problem_types_ids: string[];
}

export interface PostCreateIssueResponse {
  id: string;
  requester: string;
  phone: string;
  city_id: string;
  workstation_id: string;
  email: string;
  date: Date;
  problem_category: {
    id: string;
    name: string;
    description: string;
    problem_types: ProblemType[];
  };
  problem_types: ProblemType[];
}

export interface PutUpdateIssueParams {
  issueId: string;
  data: {
    requester: string;
    phone: string;
    city_id: string;
    workstation_id: string;
    email: string;
    date: Date;
    problem_category_id: string;
    problem_types_ids: string[];
  };
}

export interface PutUpdateIssueResponse {
  id: string;
  requester: string;
  phone: string;
  city_id: string;
  workstation_id: string;
  email: string;
  date: Date;
  problem_category: {
    id: string;
    name: string;
    description: string;
    problem_types: ProblemType[];
  };
  problem_types: ProblemType[];
}

export interface DeleteIssueParams {
  issueId: string;
}

export interface IssuePayload {
  issueId: string;
  requester: string;
  phone: string;
  city_id: string;
  workstation_id: string;
  email: string;
  date: Date;
  problem_category_id: string;
  problem_types_ids: string[];
}
