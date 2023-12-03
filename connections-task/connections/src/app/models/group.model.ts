export interface GroupModel {
  id: {
    S: string;
  };
  name: {
    S: string;
  };
  createdAt: {
    S: string; // unix timestamp
  };
  createdBy: {
    S: string;
  };
}

export interface GroupsModel {
  Count: number;
  Items: GroupModel[];
}

export interface Group {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string;
}
