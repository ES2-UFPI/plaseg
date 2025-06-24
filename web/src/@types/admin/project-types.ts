export interface Field {
  id: string;
  name: string;
  value: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface Document {
  id: string;
  name: string;
  fields: Field[];
  createdAt: Date;
  updatedAt: Date | null;
}

export interface ProjectType {
  id: string;
  name: string;
  documents: Document[];
  createdAt: Date;
  updatedAt: Date | null;
}
