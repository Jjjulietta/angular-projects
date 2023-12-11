export interface PeopleModel {
  name: {
    S: string;
  };
  uid: {
    S: string;
  };
}

export interface People {
  Count: number;
  Items: PeopleModel[];
}

export interface UserModel {
  id: string;
  name: string;
}

export interface UserModelTwo {
  [id: string]: string | null;
}

/*export interface UserNameData {
  users: UserModelTwo | null;
}*/
