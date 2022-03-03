export interface Item {
  '@id': string;
  '@type': string;
  Description: string;
  Title: string;
  UID: string;
  description: string;
  effective: Date;
  filesize?: number;
  filetype?: any;
  institute: string;
  location_short?: string;
  news_date?: Date;
  oes: string[];
  path_string: string;
  review_state?: string;
  role?: string;
  school: string;
  search_type: string;
  start_date: string;
  end_date: string;
  start_event: Date;
  title: string;
  title_parents: string[];
  start_continuing_education?: string;
}
