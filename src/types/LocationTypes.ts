export interface LocationData {
  link: string;
  profile_link: string;
  googlemap_point: Array<number>;
  type: string;
  name: string;
  id: string;
}

export interface LocationResultSet {
  query: string;
  results: {
    locations: Array<LocationData>
  }
}
