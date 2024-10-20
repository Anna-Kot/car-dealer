export interface Make {
  MakeId: number;
  MakeName: string;
}
export interface Model {
  Model_ID: number;
  Model_Name: string;
}

export interface ModelsListProps {
  models: Model[];
}
export interface ResultPageProps {
  params: {
    makeId: string;
    year: string;
  };
}

export interface ResultViewProps {
  makeId: string;
  year: string;
}

export interface OutputProp {
  makeName: string;
  year: string;
}
